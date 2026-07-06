import analytics from '@react-native-firebase/analytics';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mixpanel} from '../../../App';
import {SCREEN_NAMES} from '../../../constants';
import {setTimeFrameData} from '../../../redux';
import {
  addRestaurantBooking,
  createVenueDealBooking,
  navigate,
  showToastError,
} from '../../../services';
import {
  checkWithCurrentDateDifference,
  createChatByBookingDetail,
  getFormattedDate,
  getFormattedTime,
  setCustomTimeFromISOString,
} from '../../../utils';

const normalizeDate = date => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
};

const buildVenueDealApprovalDetails = ({
  bookingData,
  bookingTimestamp,
  formattedDate,
  loginData,
  restaurantDetails,
  selectedTimeFame,
  serviceDetails,
  venueDealBookingData,
}) => ({
  ...(bookingData || {}),
  Approved: bookingData?.Approved ?? false,
  BookingDay:
    bookingData?.BookingDay || bookingData?.booking_date || formattedDate,
  BookingTimestamp: bookingData?.BookingTimestamp || bookingTimestamp,
  HourEnd: bookingData?.HourEnd || selectedTimeFame?.End,
  HourStart: bookingData?.HourStart || selectedTimeFame?.Start,
  MinuteEnd: bookingData?.MinuteEnd || selectedTimeFame?.Minute_End,
  MinuteStart: bookingData?.MinuteStart || selectedTimeFame?.Minute_Start,
  Rejectedstatus: bookingData?.Rejectedstatus ?? false,
  actions_turbo: bookingData?.actions_turbo || serviceDetails?._actions_turbo,
  id: bookingData?.id || bookingData?.booking_id || bookingData?.booking?.id,
  isVenueDeal: true,
  isVenueDealBooking: true,
  rawVenueDealBooking: bookingData?.booking,
  restaurant_turbo_id:
    bookingData?.restaurant_turbo_id ||
    bookingData?.booking?.restaurant_turbo_id ||
    restaurantDetails?.id,
  user_turbo: bookingData?.user_turbo || loginData,
  user_turbo_id:
    bookingData?.user_turbo_id ||
    bookingData?.booking?.user_turbo_id ||
    loginData?.id,
  venue_deal_booking_id:
    bookingData?.venue_deal_booking_id ||
    bookingData?.booking_id ||
    bookingData?.booking?.id,
  venue_deal_id:
    bookingData?.venue_deal_id ||
    bookingData?.booking?.venue_deal_id ||
    venueDealBookingData?.venue_deal_id,
  venue_deal_timeframe_id:
    bookingData?.venue_deal_timeframe_id ||
    bookingData?.booking?.venue_deal_timeframe_id ||
    venueDealBookingData?.venue_deal_timeframe_id,
  _offers_turbo: bookingData?._offers_turbo || {
    Credits: serviceDetails?.Credits,
    Offer_Cover: serviceDetails?.Offer_Cover || serviceDetails?.cover_image,
    Offer_Name:
      serviceDetails?.Deal_Title || serviceDetails?.title || 'Venue deal',
    instructions:
      serviceDetails?.content_instructions ||
      serviceDetails?.at_offer_description ||
      serviceDetails?.Description ||
      '',
  },
  _restaurant_turbo: bookingData?._restaurant_turbo || {
    Adress: restaurantDetails?.Adress || restaurantDetails?.address,
    Cover:
      restaurantDetails?.Cover ||
      restaurantDetails?.cover_image ||
      restaurantDetails?.Cover_Image,
    Name: restaurantDetails?.Name || restaurantDetails?.name,
    id: restaurantDetails?.id,
    is_event: restaurantDetails?.is_event,
  },
  _timeframes_turbo: bookingData?._timeframes_turbo || selectedTimeFame,
});

const useBookingDetails = () => {
  const timeFrameData = useSelector(
    state => state.restaurantSlice.timeFrameData,
  );
  // console.log('timeFrameData_useBookingDetails', JSON.stringify(timeFrameData));
  const loginData = useSelector(state => state.authSlice.loginData);
  const route = useRoute();
  const actionNumId = route.params?.actionNumId;
  const influencerCount = route.params?.influencerCount;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentWeekDay, setCurrentWeekDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const dispatch = useDispatch();
  const [weekDayWiseTimeSlots, setWeekDayWiseTimeSlots] = useState([]);
  const [selectedTimeFame, setSelectedTimeFame] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDatesLoading, setIsDatesLoading] = useState(true);
  const [isLatestWeek, setIsLatestWeek] = useState(true);
  const [ownerMessage, setOwnerMessage] = useState('');
  const [eventDates, setEventDates] = useState([]);
  const [eventTimes, setEventTimes] = useState([]);
  const [eventSelectedDateIndex, setEventSelectedDateIndex] = useState(-1);
  const [isBookingDateAvailable, setIsBookingDateAvailable] = useState(false);
  const serviceDetails = useSelector(
    state => state.restaurantSlice.serviceDetails,
  );
  const isVenueDeal = !!serviceDetails?.isVenueDeal;
  const venueDealStartDate = serviceDetails?.start_date
    ? normalizeDate(serviceDetails.start_date)
    : null;
  const venueDealEndDate = serviceDetails?.end_date
    ? normalizeDate(serviceDetails.end_date)
    : null;
  const isOneTimeVenueDeal =
    isVenueDeal && serviceDetails?.frequency_type === 'one_time';
  const oneTimeStartDate = isOneTimeVenueDeal ? venueDealStartDate : null;
  const oneTimeEndDate = isOneTimeVenueDeal
    ? venueDealEndDate || venueDealStartDate
    : null;
  const maxBookingDate = isVenueDeal ? venueDealEndDate : null;
  const restaurantDetails = useSelector(
    state => state.restaurantSlice.restaurantDetails,
  );
  const isEvent = restaurantDetails?.is_event;
  // console.log('isEvent', isEvent);
  const today = new Date();
  const todayUtcTime = today?.getTime();
  let after24Hours = todayUtcTime;
  // console.log(
  //   'restaurantDetails?.event_date_time',
  //   restaurantDetails?.event_date_time,
  //   restaurantDetails,
  //   eventSelectedDateIndex,
  //   isEvent,
  // );

  if (restaurantDetails?.booking_buffer_time) {
    after24Hours =
      todayUtcTime +
      1 * restaurantDetails?.booking_buffer_time * 60 * 60 * 1000;
  }

  const getDateWeek = date => {
    const currentsDate = typeof date === 'object' ? date : new Date();
    const januaryFirst = new Date(currentsDate?.getFullYear(), 0, 1);
    const daysToNextMonday =
      januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
    const nextMonday = new Date(
      currentsDate.getFullYear(),
      0,
      januaryFirst.getDate() + daysToNextMonday,
    );

    return currentsDate < nextMonday
      ? 52
      : currentsDate > nextMonday
      ? Math.ceil((currentsDate - nextMonday) / (24 * 3600 * 1000) / 7)
      : 1;
  };

  const getVisibleWeekEndDate = weekStartDate => {
    const newEndDate = new Date(weekStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);

    if (
      maxBookingDate &&
      normalizeDate(newEndDate).getTime() > maxBookingDate.getTime()
    ) {
      return maxBookingDate;
    }

    return newEndDate;
  };

  const isLastAvailableWeek = (() => {
    if (!maxBookingDate) {
      return false;
    }

    const nextWeekStartDate = new Date(startDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);

    return (
      normalizeDate(nextWeekStartDate).getTime() > maxBookingDate.getTime()
    );
  })();

  // console.log('start date', startDate);
  const showNextWeek = () => {
    if (isLastAvailableWeek) {
      return;
    }

    if (isLatestWeek) {
      setIsLatestWeek(false);
    }
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    const newEndDate = getVisibleWeekEndDate(newStartDate);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  // console.log(timeFrameData, 'timeFrameData');
  const showPreviousWeek = () => {
    if (getDateWeek(startDate) <= getDateWeek(currentDate)) {
      return;
    }
    if (startDate >= currentDate) {
      const newStartDate = new Date(startDate);
      newStartDate?.setDate(startDate.getDate() - 7);
      const newEndDate = new Date(newStartDate);
      newEndDate?.setDate(newEndDate.getDate() + 6);
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  const isDateAvailable = date => {
    // Replace this with logic to check if the date is available for booking
    return true; // Return true for available, false for unavailable
  };

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ServiceDetails);
  };
  // console.log(
  //   ' conditionCheck',
  //   selectedDate,
  //   // serviceDetails?.actions_turbo_id,
  // );

  const formatDate = date => {
    const d = new Date(date); // Create a Date object from the input

    const day = d.getDate().toString().padStart(2, '0'); // Get the day and pad it to two digits
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-indexed) and pad it
    const year = d.getFullYear().toString().slice(2); // Get the last two digits of the year

    return `${day}-${month}-${year}`;
  };
  // console.log(
  //   typeof timeFrameData?.[0]?.End,
  //   typeof timeFrameData?.[0]?.Minute_End,
  //   timeFrameData?.[0]?.End,
  //   timeFrameData?.[0]?.Minute_End,
  //   setCustomTimeFromISOString(
  //     new Date(),
  //     timeFrameData?.[0]?.End,
  //     timeFrameData?.[0]?.Minute_End,
  //   ),
  //   setCustomTimeFromISOString(new Date(), 16, 48),
  //   // timeFrameData?.[0],
  //   // new Date().getTime(timeFrameData?/) / 6000 - new Date().getTime() / 6000,
  //   'new Date().getMinutes',
  // );

  const handleConfirmBtnPress = async () => {
    setIsLoading(true);
    const currentBookingDateTime = new Date(selectedDate);
    const availabilityTimeFrame = isVenueDeal
      ? selectedTimeFame
      : timeFrameData?.[0];
    console.log('Current booking date: ' + currentBookingDateTime);
    if (
      isVenueDeal &&
      (!selectedTimeFame?.id ||
        selectedTimeFame?.start_minutes == null ||
        selectedTimeFame?.end_minutes == null)
    ) {
      showToastError({message: 'Please select an available time slot.'});
      setIsLoading(false);
      return;
    }

    if (!isEvent && actionNumId !== 9) {
      const parsedHours = parseInt(selectedTimeFame?.Start);
      const parsedMinutes = parseInt(selectedTimeFame?.Minute_Start);
      console.log('ParsedHours: ' + parsedHours, 'Minutes: ' + parsedMinutes);
      currentBookingDateTime?.setHours(parsedHours, parsedMinutes);
    }

    if (
      isEvent &&
      new Date().getTime() >
        restaurantDetails?.event_date_time[eventSelectedDateIndex]
    ) {
      const error = {
        message:
          'You can only book booking which starts after your current time.',
      };
      showToastError(error);
      setIsLoading(false);
      return;
    }

    // console.log(
    //   currentBookingDateTime,
    //   timeFrameData?.[0]?.DayOfBooking,
    //   timeFrameData?.[0]?.End,
    //   timeFrameData?.[0]?.Minute_End,
    //   checkWithCurrentDateDifference(
    //     currentBookingDateTime,
    //     timeFrameData?.[0]?.End,
    //     timeFrameData?.[0]?.Minute_End,
    //   ),
    //   'checkWithCurrentDateDifference',
    // );
    if (
      currentBookingDateTime?.getTime() >= after24Hours ||
      ((restaurantDetails?.booking_buffer_time == 0 ||
        !restaurantDetails?.booking_buffer_time) &&
        checkWithCurrentDateDifference(
          currentBookingDateTime,
          availabilityTimeFrame?.End,
          availabilityTimeFrame?.Minute_End,
        ) >= 10)
    ) {
      const bookingTimeStamp = currentBookingDateTime?.valueOf();
      const formattedDate = `${currentBookingDateTime?.getFullYear()}-${
        currentBookingDateTime.getMonth() + 1 < 10
          ? `0${currentBookingDateTime?.getMonth() + 1}`
          : currentBookingDateTime?.getMonth() + 1
      }-${
        currentBookingDateTime.getDate() < 10
          ? `0${currentBookingDateTime?.getDate()}`
          : currentBookingDateTime?.getDate()
      }`;

      const actionNumId = serviceDetails?._actions_turbo?.action_num_id;
      const isApproved =
        actionNumId === 1 || actionNumId === 2 || actionNumId === 3;

      const prepData = {
        ApprovalStatus: false,
        Approved: isApproved,
        BookingDay: formattedDate,
        BookingTimestamp: bookingTimeStamp,
        BoxVisibility: 'true',
        CouponStatus: 'true',
        HourEnd: null,
        HourStart: '',
        Instagram_Status: '',
        Instructions: '',
        LinkAzione: '',
        MinuteEnd: '',
        MinuteStart: null,
        OfferVIsibility: false,
        Rejectedstatus: false,
        message: ownerMessage,
        Submitbutton_: 'false',
        Title: '',
        action_status_turbo_id: 0,
        actions_turbo_id: serviceDetails?.actions_turbo_id,
        booking_status_id: 0,
        booking_time: isEvent
          ? restaurantDetails?.event_date_time[eventSelectedDateIndex]
          : 0,
        deal_scheme_id: 0,
        events_id: 0,
        offers_turbo_id: serviceDetails?.id,
        restaurant_id: restaurantDetails?.id,
        timeframes_id: selectedTimeFame?.id ?? 0,
        user_turbo_id: loginData?.id,
      };
      if (actionNumId === 9) {
        prepData['additional_influencer'] = influencerCount;
      }
      if (isVenueDeal) {
        const venueDealBookingData = {
          venue_deal_id: serviceDetails?.venueDeal?.id || serviceDetails?.id,
          booking_date: formattedDate,
          start_minutes: Number(selectedTimeFame?.start_minutes || 0),
          end_minutes: Number(selectedTimeFame?.end_minutes || 0),
          user_turbo_id: loginData?.id,
          venue_deal_timeframe_id: selectedTimeFame?.id,
        };
        const res = await createVenueDealBooking(venueDealBookingData);
        const bookingDetails = buildVenueDealApprovalDetails({
          bookingData: res?.data,
          bookingTimestamp: bookingTimeStamp,
          formattedDate,
          loginData,
          restaurantDetails,
          selectedTimeFame,
          serviceDetails,
          venueDealBookingData,
        });
        console.log('VENUE_DEAL_BOOKING_CHAT_DEBUG', {
          createVenueDealBookingPayload: venueDealBookingData,
          createVenueDealBookingResponse: res,
          builtBookingDetails: bookingDetails,
          restaurantDetails,
          serviceDetails,
          selectedTimeFame,
        });
        const isBookingCreated =
          (res?.status >= 200 && res?.status < 300) ||
          !!res?.data?.id ||
          res?.raw?.success === true ||
          res?.success === true;

        if (isBookingCreated) {
          mixpanel.track('Venue Deal Booking Made', {
            'Booking Id': bookingDetails?.id,
            'User Id': loginData?.id,
            'Venue Deal Id': venueDealBookingData.venue_deal_id,
            'Time Frame Id': venueDealBookingData.venue_deal_timeframe_id,
            'Booking Date': venueDealBookingData.booking_date,
          });

          await analytics().logEvent('venue_deal_booking_made', {
            bookingId: bookingDetails?.id,
            userId: loginData?.id,
            venueDealId: venueDealBookingData.venue_deal_id,
            timeFrameId: venueDealBookingData.venue_deal_timeframe_id,
            bookingDate: venueDealBookingData.booking_date,
          });

          await createChatByBookingDetail({
            bookingDetails,
          });

          navigate(SCREEN_NAMES.BookingOnApprovalScreen, {
            bookingDetails,
          });
        } else if (res?.status !== 400) {
          showToastError({
            message: res?.message || res?.data || 'Something went wrong',
          });
        }

        setIsLoading(false);
        return;
      }

      const res = await addRestaurantBooking(prepData);
      // console.log('res_handleConfirmBtnPress', res);

      if (res?.status === 200) {
        console.log('Booking Details:', res);
        console.log('LEGACY_BOOKING_CHAT_DEBUG', {
          addRestaurantBookingPayload: prepData,
          addRestaurantBookingResponse: res,
          bookingDetails: res?.data,
        });
        mixpanel.track('Booking Made', {
          'Booking Id': res?.data?.id,
          'User Id': res?.data?.user_turbo_id,
          'Venue Id': res?.data?.restaurant_id,
          'Time Frame Id': res?.data?.timeframes_id,
          'Booking Date': formattedDate,
          'Booking Timestamp': bookingTimeStamp,
        });

        await analytics().logEvent('booking_made', {
          bookingId: res?.data?.id,
          userId: res?.data?.user_turbo_id,
          venueId: res?.data?.restaurant_id,
          timeFrameId: res?.data?.timeframes_id,
          bookingDate: formattedDate,
          bookingTimeStamp: bookingTimeStamp,
        });
        const channel = await createChatByBookingDetail({
          bookingDetails: res?.data,
        });
        navigate(SCREEN_NAMES.BookingOnApprovalScreen, {
          bookingDetails: res?.data,
        });
      } else if (res?.status !== 400) {
        let error;
        console.log('res_', JSON.stringify(res));

        error = {
          message: res?.message || res?.data,
        };
        showToastError(error);
      }
      setIsLoading(false);
    } else {
      let error = {};
      if (
        (restaurantDetails?.booking_buffer_time == 0 ||
          !restaurantDetails?.booking_buffer_time) &&
        checkWithCurrentDateDifference(
          currentBookingDateTime,
          availabilityTimeFrame?.End,
          availabilityTimeFrame?.Minute_End,
        ) < 10
      ) {
        error = {
          message:
            'This time slot isn’t available. Please select a different time or date.',
        };
      } else {
        error = {
          message: `You can only book booking which starts ${restaurantDetails?.booking_buffer_time} hours later.`,
        };
      }

      showToastError(error);
      setIsLoading(false);
      return;
    }
  };

  const handleRemoveBtnPress = () => {
    setSelectedTimeFame({});
  };

  const datesBlacklistFunc = date => {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');
    const onlyDate = `${year}-${month}-${day}`;

    // action num id 9 is for villa & for villa we need to enable all the dates after 24 hours
    if (actionNumId === 9) {
      if (myDate.getTime() <= after24Hours) {
        return true;
      } else {
        return false;
      }
    }

    // Event Specific Condition because here time come in UTC format
    if (isEvent) {
      const filteredRes = eventDates?.filter(dt => dt === onlyDate);
      if (filteredRes?.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    if (isOneTimeVenueDeal) {
      if (!oneTimeStartDate || !oneTimeEndDate) {
        return true;
      }

      const normalizedDate = normalizeDate(myDate);
      return (
        normalizedDate.getTime() < oneTimeStartDate.getTime() ||
        normalizedDate.getTime() > oneTimeEndDate.getTime()
      );
    }

    if (
      maxBookingDate &&
      normalizeDate(myDate).getTime() > maxBookingDate.getTime()
    ) {
      return true;
    }

    const weekDay = myDate.toLocaleString('en-US', {weekday: 'long'});
    let outerFilteredRes = [];

    timeFrameData?.forEach(t => {
      const weekdays = t?.weekdays;
      const pauseDays = t?.pause_days;

      if (pauseDays?.length > 0) {
        const filteredWeekdays = weekdays?.filter(
          weekday =>
            !pauseDays?.some(pauseDay => pauseDay?.day === weekday?.day),
        );
        const filteredRes = filteredWeekdays?.filter(wt => {
          return wt?.day === weekDay;
        });

        outerFilteredRes = [...outerFilteredRes, ...filteredRes];
      } else {
        const filteredRes = weekdays?.filter(wt => {
          return wt?.day === weekDay;
        });
        outerFilteredRes = [...outerFilteredRes, ...filteredRes];
      }
    });

    if (outerFilteredRes?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    // console.log('check_useEffect_code_run_after_date_change');
    setSelectedTimeFame({});
    const myDate = new Date(selectedDate);
    const weekDay = myDate?.toLocaleString('en-US', {weekday: 'long'});
    const newStartDate = new Date(myDate);
    newStartDate.setDate(newStartDate.getDate() - 3);

    setStartDate(newStartDate);
    setCurrentWeekDay(weekDay);

    const updatedData = timeFrameData?.map(item => {
      const weekdays = item?.weekdays;
      const pauseDays = item?.pause_days;

      const filteredWeekdays = weekdays?.filter(
        day => !pauseDays?.some(pauseDay => pauseDay?.day === day?.day),
      );
      return {
        ...item,
        weekdays: filteredWeekdays,
      };
    });

    setWeekDayWiseTimeSlots(updatedData || []);
    let selectedTimeFrame = null;
    updatedData?.forEach(t => {
      const filteredRes = t?.weekdays?.filter(wt => wt?.day === weekDay);
      if (filteredRes?.length > 0 && !selectedTimeFrame) {
        // console.log('updatedData', filteredRes);
        selectedTimeFrame = t;
      }
    });
    if (selectedTimeFrame) {
      setSelectedTimeFame(selectedTimeFrame);
    }

    // This is for when user's date and booking date are same then to show event time we have done this.
    if (isEvent) {
      eventDates.filter((date, index) => {
        if (date === getFormattedDate(selectedDate))
          setEventSelectedDateIndex(index);
      });
    }
  }, [
    eventDates,
    isEvent,
    selectedDate,
    timeFrameData,
    setWeekDayWiseTimeSlots,
    setSelectedTimeFame,
  ]);

  useEffect(() => {
    const findClosestAvailableDate = () => {
      if (isVenueDeal && maxBookingDate) {
        const earliestBookingDate = normalizeDate(after24Hours);
        const searchStartDate = new Date(
          isOneTimeVenueDeal && oneTimeStartDate
            ? Math.max(
                earliestBookingDate.getTime(),
                oneTimeStartDate.getTime(),
              )
            : earliestBookingDate.getTime(),
        );
        const firstCandidate =
          searchStartDate.getTime() > maxBookingDate.getTime()
            ? maxBookingDate
            : searchStartDate;
        const daysInRange =
          Math.ceil(
            (maxBookingDate.getTime() - firstCandidate.getTime()) /
              (24 * 60 * 60 * 1000),
          ) + 1;

        for (let i = 0; i < Math.max(daysInRange, 0); i++) {
          const checkDate = new Date(firstCandidate);
          checkDate.setDate(firstCandidate.getDate() + i);
          if (!datesBlacklistFunc(checkDate)) {
            return checkDate;
          }
        }

        return firstCandidate;
      }

      if (isOneTimeVenueDeal && oneTimeStartDate && oneTimeEndDate) {
        const firstCandidate = new Date(
          Math.max(
            normalizeDate(after24Hours).getTime(),
            oneTimeStartDate.getTime(),
          ),
        );
        const daysInRange =
          Math.ceil(
            (oneTimeEndDate.getTime() - firstCandidate.getTime()) /
              (24 * 60 * 60 * 1000),
          ) + 1;

        for (let i = 0; i < Math.max(daysInRange, 0); i++) {
          const checkDate = new Date(firstCandidate);
          checkDate.setDate(firstCandidate.getDate() + i);
          if (!datesBlacklistFunc(checkDate)) {
            return checkDate;
          }
        }

        return firstCandidate;
      }

      const today = new Date(after24Hours);
      for (let i = 0; i < 30; i++) {
        // Check for the next 30 days
        const checkDate = new Date(today);
        checkDate?.setDate(today.getDate() + i);
        if (!datesBlacklistFunc(checkDate)) {
          return checkDate;
        }
      }
      return today; // Default to today if no available date is found
    };

    setSelectedDate(findClosestAvailableDate());
    setTimeout(() => {
      setIsDatesLoading(false);
    }, 2000);
    // This effect initializes the booking calendar only once on screen mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const myDate = new Date(selectedDate);
    // const month = myDate.toLocaleString('en-US', {month: 'long'});
    // setCurrentMonth(month);
    setCurrentDate(myDate.getDate());
  }, [selectedDate]);

  useEffect(() => {
    const selectedDateTemp = new Date(selectedDate);
    const selectedMonth = selectedDateTemp.toLocaleString('en-US', {
      month: 'long',
    });

    const myDate = new Date(startDate);
    const month = myDate?.toLocaleString('en-US', {month: 'long'});
    if (!selectedDate || myDate > selectedDateTemp) {
      setCurrentMonth(month);
    } else {
      setCurrentMonth(selectedMonth);
    }
  }, [startDate, selectedDate]);

  useEffect(() => {
    if (getDateWeek(startDate) <= getDateWeek(currentDate)) {
      setIsLatestWeek(true);
    }
  }, [currentDate, startDate]);

  useEffect(() => {
    if (isEvent) {
      const convertedEventDates = restaurantDetails?.event_date_time.map(ts =>
        getFormattedDate(ts),
      );
      const convertedEventTimes = restaurantDetails?.event_date_time.map(ts =>
        getFormattedTime(ts),
      );
      console.log('convertedEventTimes', convertedEventTimes);
      setEventDates(convertedEventDates);
      setEventTimes(convertedEventTimes);
    }
  }, [isEvent, restaurantDetails?.event_date_time]);

  useEffect(() => {
    if (isEvent) {
      setWeekDayWiseTimeSlots([]);
      const formattedDate = getFormattedDate(selectedDate);
      const filteredRes = eventDates?.filter(ed => ed === formattedDate);
      if (filteredRes?.length > 0) {
        setIsBookingDateAvailable(true);
      } else {
        setIsBookingDateAvailable(false);
      }
    }
  }, [eventDates, isEvent, selectedDate]);

  useEffect(() => {
    return () => {
      dispatch(setTimeFrameData([]));
    };
  }, [dispatch]);

  return {
    actionNumId,
    currentDate,
    currentMonth,
    currentWeekDay,
    after24Hours,
    ownerMessage,
    setOwnerMessage,
    datesBlacklistFunc,
    endDate,
    handleBackPress,
    handleConfirmBtnPress,
    handleRemoveBtnPress,
    isLatestWeek,
    isLoading,
    isEvent,
    isLastAvailableWeek,
    eventDates,
    eventTimes,
    eventSelectedDateIndex,
    setEventSelectedDateIndex,
    isBookingDateAvailable,
    isDateAvailable,
    isDatesLoading,
    selectedDate,
    selectedTimeFame,
    maxBookingDate,
    setSelectedDate,
    setSelectedTimeFame,
    showNextWeek,
    showPreviousWeek,
    startDate,
    weekDayWiseTimeSlots,
  };
};
export default useBookingDetails;
