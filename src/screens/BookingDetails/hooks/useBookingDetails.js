import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mixpanel} from '../../../App';
import {SCREEN_NAMES} from '../../../constants';
import {setTimeFrameData} from '../../../redux';
import {
  addRestaurantBooking,
  navigate,
  // getTimeFrames,
  showToastError,
} from '../../../services';
import {getFormattedDate, getFormattedTime} from '../../../utils';
import analytics from '@react-native-firebase/analytics';

const useBookingDetails = () => {
  const timeFrameData = useSelector(
    state => state.restaurantSlice.timeFrameData,
  );
  console.log('timeFrameData', JSON.stringify(timeFrameData));
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
  // const [timeFrameData, setTimeFrameData] = useState([])
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
  const restaurantDetails = useSelector(
    state => state.restaurantSlice.restaurantDetails,
  );
  const isEvent = restaurantDetails?.is_event;
  const today = new Date();
  const todayUtcTime = today.getTime();
  const after24Hours =
    todayUtcTime +
    1 * (restaurantDetails?.booking_buffer_time ?? 0) * 60 * 60 * 1000;

  // console.log(
  //   'All dates:',
  //   startDate,
  //   '#',
  //   selectedDate,
  //   '#',
  //   endDate,
  //   '#',
  //   currentDate,
  //   '#',
  //   currentWeekDay,
  //   '#',
  //   currentMonth,
  // );

  const getDateWeek = date => {
    const currentsDate = typeof date === 'object' ? date : new Date();
    const januaryFirst = new Date(currentsDate.getFullYear(), 0, 1);
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

  // console.log(
  //   'Week number of ' + currentDate + ' is : ' + getDateWeek(currentDate),
  //   getDateWeek(startDate),
  // );

  const showNextWeek = () => {
    if (isLatestWeek) {
      setIsLatestWeek(false);
    }
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const showPreviousWeek = () => {
    if (getDateWeek(startDate) <= getDateWeek(currentDate)) {
      return;
    }
    if (startDate >= currentDate) {
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() - 7);
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 6);
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

  const handleConfirmBtnPress = async () => {
    setIsLoading(true);
    const currentBookingDateTime = new Date(selectedDate);
    console.log('Current booking date: ' + currentBookingDateTime);
    if (!isEvent && actionNumId !== 9) {
      const parsedHours = parseInt(selectedTimeFame?.Start);
      const parsedMinutes = parseInt(selectedTimeFame?.Minute_Start);
      console.log('ParsedHours: ' + parsedHours, 'Minutes: ' + parsedMinutes);
      currentBookingDateTime.setHours(parsedHours, parsedMinutes);
    }

    console.log(
      'Todays UTC Time: ' + after24Hours,
      currentBookingDateTime.getTime(),
      selectedDate,
      currentBookingDateTime,
    );

    if (currentBookingDateTime.getTime() >= after24Hours) {
      const bookingTimeStamp = currentBookingDateTime.valueOf();
      const formattedDate = `${currentBookingDateTime.getFullYear()}-${
        currentBookingDateTime.getMonth() + 1 < 10
          ? `0${currentBookingDateTime.getMonth() + 1}`
          : currentBookingDateTime.getMonth() + 1
      }-${
        currentBookingDateTime.getDate() < 10
          ? `0${currentBookingDateTime.getDate()}`
          : currentBookingDateTime.getDate()
      }`;

      const actionNumId = serviceDetails?._actions_turbo?.action_num_id;
      const isApproved =
        actionNumId === 1 || actionNumId === 2 || actionNumId === 3;
      console.log(
        ' conditionCheck',
        selectedDate,
        currentBookingDateTime,
        formattedDate,
        serviceDetails?.actions_turbo_id,
      );
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
      console.log('prepData: ', prepData);
      const res = await addRestaurantBooking(prepData);
      if (res?.status === 200) {
        console.log('Booking Details:', res);
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

        navigate(SCREEN_NAMES.BookingOnApprovalScreen, {
          bookingDetails: res?.data,
        });
      } else {
        console.log('res: ', JSON.stringify(res));
        const error = {
          message: res?.data,
        };
        showToastError(error);
      }
      setIsLoading(false);
    } else {
      let error = {};
      if (restaurantDetails?.booking_buffer_time === 0) {
        error = {
          message:
            'You can only book booking which starts after your current time.',
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
    console.log('Blacklist Dates: ' + onlyDate, eventDates);

    // action num id 9 is for villa & for villa we need to enable all the dates after 24 hours
    if (actionNumId === 9) {
      if (myDate.getTime() <= after24Hours) {
        return true;
      } else {
        return false;
      }
    }

    if (myDate.getTime() <= after24Hours) {
      // setSelectedDate(new Date(after24Hours));
      return true;
    }

    // Event Specific Condition because here time come in UTC format
    if (isEvent) {
      const filteredRes = eventDates.filter(dt => dt === onlyDate);
      if (filteredRes.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    // console.log(
    //   'My Date UTC & after 24 hours',
    //   myDate.getTime(),
    //   after24Hours,
    //   myDate.getTime() <= after24Hours,
    // );

    const weekDay = myDate.toLocaleString('en-US', {weekday: 'long'});
    let outerFilteredRes = [];
    // console.log('weekDay: ', weekDay);
    // const filteredData = timeFrameData?.filter((t) => t._weekdaysturbo?.day === weekDay)
    const filteredData = timeFrameData?.filter(t => {
      const weekdays = t?.weekdays;
      const pauseDays = t?.pause_days;
      if (pauseDays?.length > 0) {
        const filteredWeekdays = weekdays.filter(
          day => !pauseDays.some(pauseDay => pauseDay?.day === day?.day),
        );
        const filteredRes = filteredWeekdays.filter(wt => {
          return wt?.day === weekDay;
        });

        outerFilteredRes = filteredRes;
        // if (filteredRes?.length > 0) {
        //   return false;
        // } else {
        //   return true;
        // }
      } else {
        const filteredRes = weekdays.filter(wt => {
          // console.log('Condition', wt?.day, weekDay, wt?.day === weekDay);
          return wt?.day === weekDay;
        });

        outerFilteredRes = filteredRes;
        // if (filteredRes?.length > 0) {
        //   return true;
        // } else {
        //   return false;
        // }
      }
    });
    // console.log('outerFilteredRes', JSON.stringify(outerFilteredRes));
    console.log('filteredData: ' + JSON.stringify(filteredData));
    if (outerFilteredRes?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  // TODO: Remove below code once you get clearance
  // const getTimeFrameData = async () => {
  //   const params = `/${restaurantDetails?.id}`
  //   const res = await getTimeFrames(params)
  //   setTimeFrameData(res)
  //   const myDate = new Date(selectedDate)
  //   const weekDay = myDate.toLocaleString('en-US', { weekday: 'long' })
  //   setCurrentWeekDay(weekDay)
  //   // const filteredData = res?.filter((t) => t._weekdaysturbo?.day === weekDay)
  //   const filteredData = res?.filter((t) => {
  //     const filteredRes = t.weekdays?.filter((wt) => wt?.day === weekDay)
  //     if (filteredRes.length > 0) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  //   filteredData.forEach((item) => {
  //     const weekdays = item.weekdays
  //     const pauseDays = item.pause_days
  //     const filteredWeekdays = weekdays.filter((day) => !pauseDays.some((pauseDay) => pauseDay?.day === day?.day))
  //     item.weekdays = filteredWeekdays
  //   })
  //   console.log('filteredTimeData1: ' + JSON.stringify(filteredData))
  //   setWeekDayWiseTimeSlots(filteredData)
  //   setTimeout(() => {
  //     setIsDatesLoading(false)
  //   }, 2000)
  // }
  // useEffect(() => {
  //   getTimeFrameData()
  // }, [])
  // TODO: Till Here

  useEffect(() => {
    setSelectedTimeFame({});
    const myDate = new Date(selectedDate);
    const weekDay = myDate.toLocaleString('en-US', {weekday: 'long'});
    console.log('weekDay: ' + weekDay);
    setCurrentWeekDay(weekDay);

    const updatedData = timeFrameData?.map(item => {
      const weekdays = item?.weekdays;
      const pauseDays = item?.pause_days;
      console.log('weekdays: ' + weekdays, 'pauseDays: ' + pauseDays);
      const filteredWeekdays = weekdays.filter(
        day => !pauseDays.some(pauseDay => pauseDay?.day === day?.day),
      );
      return {
        ...item,
        weekdays: filteredWeekdays,
      };
    });
    console.log('filteredTimeData2: ' + JSON.stringify(updatedData));
    const resu = updatedData?.forEach(t => {
      const filteredRes = t?.weekdays?.filter(wt => wt?.day === weekDay);
      if (filteredRes.length > 0) {
        setWeekDayWiseTimeSlots(updatedData);
        setSelectedTimeFame(updatedData?.[0]);
      }
      //  else {
      //   setWeekDayWiseTimeSlots([]);
      // }
    });
    const chosenDate = new Date(selectedDate);
    if (chosenDate?.getTime() <= after24Hours) {
      const newSelectedDate = new Date(after24Hours + 1 * 24 * 60 * 60 * 1000);
      setSelectedDate(newSelectedDate);
      setWeekDayWiseTimeSlots([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(new Date(after24Hours));
    setTimeout(() => {
      setIsDatesLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('selected Date:', selectedDate);
    const myDate = new Date(selectedDate);
    const month = myDate.toLocaleString('en-US', {month: 'long'});
    console.log('month: ' + month);
    setCurrentMonth(month);
    setCurrentDate(myDate.getDate());
  }, [selectedDate]);

  useEffect(() => {
    const myDate = new Date(startDate);
    const month = myDate.toLocaleString('en-US', {month: 'long'});
    console.log('month: ' + month);
    setCurrentMonth(month);
  }, [startDate]);

  useEffect(() => {
    if (getDateWeek(startDate) <= getDateWeek(currentDate)) {
      setIsLatestWeek(true);
    }
  }, [startDate]);

  useEffect(() => {
    if (isEvent) {
      const convertedEventDates = restaurantDetails?.event_date_time.map(ts =>
        getFormattedDate(ts),
      );
      const convertedEventTimes = restaurantDetails?.event_date_time.map(ts =>
        getFormattedTime(ts),
      );

      setEventDates(convertedEventDates);
      setEventTimes(convertedEventTimes);
    }
  }, [isEvent]);

  useEffect(() => {
    if (isEvent) {
      setWeekDayWiseTimeSlots([]);
      const formattedDate = getFormattedDate(selectedDate);
      const filteredRes = eventDates.filter(ed => ed === formattedDate);
      if (filteredRes.length > 0) {
        setIsBookingDateAvailable(true);
      } else {
        setIsBookingDateAvailable(false);
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    return () => {
      dispatch(setTimeFrameData([]));
    };
  }, []);

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
    eventDates,
    eventTimes,
    eventSelectedDateIndex,
    setEventSelectedDateIndex,
    isBookingDateAvailable,
    isDateAvailable,
    isDatesLoading,
    selectedDate,
    selectedTimeFame,
    setSelectedDate,
    setSelectedTimeFame,
    showNextWeek,
    showPreviousWeek,
    startDate,
    weekDayWiseTimeSlots,
  };
};
export default useBookingDetails;
