import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {setTimeFrameData} from '../../../redux';
import {
  addRestaurantBooking,
  navigate,
  // getTimeFrames,
  showToastError,
} from '../../../services';

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
  const serviceDetails = useSelector(
    state => state.restaurantSlice.serviceDetails,
  );
  const restaurantDetails = useSelector(
    state => state.restaurantSlice.restaurantDetails,
  );

  const showNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const showPreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
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
      Submitbutton_: 'false',
      Title: '',
      action_status_turbo_id: 0,
      actions_turbo_id: serviceDetails?.actions_turbo_id,
      booking_status_id: 0,
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
  };

  const handleRemoveBtnPress = () => {
    setSelectedTimeFame({});
  };

  const datesBlacklistFunc = date => {
    const myDate = new Date(date);
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
          console.log('Condition', wt?.day, weekDay, wt?.day === weekDay);
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
    console.log('outerFilteredRes', JSON.stringify(outerFilteredRes));
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

    setTimeout(() => {
      setIsDatesLoading(false);
    }, 2000);
  }, [selectedDate]);

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
    return () => {
      dispatch(setTimeFrameData([]));
    };
  }, []);

  return {
    actionNumId,
    currentDate,
    currentMonth,
    currentWeekDay,
    datesBlacklistFunc,
    endDate,
    handleBackPress,
    handleConfirmBtnPress,
    handleRemoveBtnPress,
    isLoading,
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
