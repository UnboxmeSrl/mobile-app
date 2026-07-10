/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, TurboModuleRegistry} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../../assets';
import {SCREEN_NAMES} from '../../../constants';
import {
  deleteCanceledBooking,
  selectBookingsByID,
  setAppInfo,
  setBookings,
  setCanceledBookings,
  updateBooking,
  updateCheckinStatus,
} from '../../../redux';
import {
  cancelBooking,
  getAllCanceledBookings,
  getAppInfo,
  getBookings,
  navigate,
  updateBookingCheckinStatus,
} from '../../../services';

// import moment from 'moment'
// import 'moment-timezone'
// import { getTimeZone } from 'react-native-localize'

const useYourScheduleDetails = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const route = useRoute();
  const bookingDetailsParams = useMemo(
    () => route.params?.bookingDetails || {},
    [],
  );
  const bookingDetail = useSelector(
    selectBookingsByID(bookingDetailsParams?.id),
  );
  // console.log('bookingDetails_useYourScheduleDetails', bookingDetail?.id);
  // const bookingsLength = useSelector(
  //   state => state.restaurantSlice.bookings?.length,
  // );
  // console.log('bookingsLength', bookingsLength);

  // const bookingDetails = useMemo(() => {
  //   console.log('bookingDetails_useMemo', bookingDetail?.isCheckedIn);
  //   return {...(bookingDetail || {})};
  // }, [bookingDetail]);
  const bookingDetails = useMemo(
    () => ({...(bookingDetailsParams || {}), ...(bookingDetail || {})}),
    [bookingDetailsParams, bookingDetail],
  );

  const approvalStage = useMemo(
    () =>
      bookingDetails?.Approved
        ? 'success'
        : bookingDetails?.Rejectedstatus
        ? 'reject'
        : 'pending',
    [bookingDetails],
  );

  // const [approvalStage, setApprovalStage] = useState(approvalStageValue);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentWeekDay, setCurrentWeekDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeFrame = bookingDetails?._timeframes_turbo;
  const isEvent = bookingDetails?._restaurant_turbo?.is_event;

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  }

  // let amenityDetailsWithCoupons = {};

  // if (actionNumId === 7) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${bookingDetails?._actions_turbo?.Beauty} X Treatment`,
  //     amenityIcon: IMAGES.beauty,
  //     // amenityDescription: 'at your choice',
  //   };
  // } else if (actionNumId === 8 || actionNumId === 53 || actionNumId === 54) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${bookingDetails?._actions_turbo?.Gym} X Pass`,
  //     amenityIcon: IMAGES.gym,
  //     // amenityDescription: 'at your choice',
  //   };
  // } else if (actionNumId === 9) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${bookingDetails?._actions_turbo?.Accomodation} x Days (${
  //       bookingDetails?._actions_turbo?.Accomodation - 1
  //     } nights)`,
  //     amenityIcon: IMAGES.resort,
  //     // amenityDescription: 'at your choice',
  //   };
  // }
  const amenityDetailsWithCoupons = useMemo(() => {
    const list = [];
    if ([7, 10, 14, 15, 16, 17, 8, 53, 54, 9].includes(actionNumId)) {
      // Primary amenities
      if ([7, 10, 14, 15, 16, 17].includes(actionNumId)) {
        if (bookingDetails?._actions_turbo?.Beauty) {
          list.push({
            amenityName: `${bookingDetails._actions_turbo.Beauty} X Treatment`,
            amenityIcon: IMAGES.beauty,
          });
        }
      }

      if ([8, 53, 54].includes(actionNumId)) {
        if (bookingDetails?._actions_turbo?.Gym) {
          list.push({
            amenityName: `${bookingDetails._actions_turbo.Gym} x Pass`,
            amenityIcon: IMAGES.gym,
          });
        }
      }

      if (actionNumId === 9 && bookingDetails?._actions_turbo?.Accomodation) {
        const days = bookingDetails._actions_turbo.Accomodation;
        list.push({
          amenityName: `${days} x Days (${days - 1} nights)`,
          amenityIcon: IMAGES.resort,
        });
      }

      // Other services
      bookingDetails?._actions_turbo?.Coupons_Services?.forEach(service => {
        if (service?.quantity > 0) {
          list.push({
            amenityName: `${service.quantity} x ${service.name}`,
            amenityIcon: service?.service_icon?.url
              ? {uri: service.service_icon.url}
              : undefined,
          });
        }
      });
      return list;
    } else {
      [];
    }
  }, [
    actionNumId,
    bookingDetails._actions_turbo.Accomodation,
    bookingDetails._actions_turbo.Beauty,
    bookingDetails._actions_turbo.Gym,
    bookingDetails._actions_turbo?.Coupons_Services,
  ]);
  const getServicesWithCoupons = useMemo(() => {
    const serviceMap = [
      // {key: 'Accomodation', label: 'Accomodation'},
      // {key: 'Gym', label: 'Gym'},
      // {key: 'Beauty', label: 'Beauty'},
      {key: 'Plates', label: 'Plates'},
      {key: 'Drinks', label: 'Drinks'},
    ];
    let specialServices = [];
    if (
      bookingDetails?._offers_turbo?.isBigInfluencer &&
      bookingDetails?._offers_turbo?.services.length > 0
    ) {
      specialServices = [...bookingDetails?._offers_turbo?.services];
    } else {
      serviceMap.forEach(({key, label}) => {
        const quantity = bookingDetails?._actions_turbo?.[key];
        if (quantity) {
          specialServices.push({name: label, quantity: Number(quantity)});
        }
      });
    }
    console.log(
      specialServices,
      bookingDetails?._offers_turbo?.isBigInfluencer,
      bookingDetails?._offers_turbo?.services,
      bookingDetails?._offers_turbo?.isBigInfluencer,
      bookingDetails?._offers_turbo?.services.length,
      'specialServices_useMemo_UseYourScheduleDetailsScreen',
    );
    return [
      ...specialServices,
      ...(bookingDetails?._actions_turbo?.Coupons_Services ?? []),
    ];
  }, [
    bookingDetails?._actions_turbo,
    bookingDetails?._offers_turbo?.isBigInfluencer,
    bookingDetails?._offers_turbo?.services,
  ]);
  const isOther_Service = useCallback(
    serviceNameKey =>
      bookingDetails?._actions_turbo?.Coupons_Services?.some(
        service => service?.name === serviceNameKey,
      ),
    [bookingDetails?._actions_turbo?.Coupons_Services],
  );
  const getIcons = useCallback(
    serviceName => {
      const serviceNameKey = serviceName?.replace(' ', '');
      console.log('serviceName.trim()', serviceNameKey || '');
      const Other_Service = isOther_Service(serviceName);
      // console.log('Other_Service', serviceNameKey, Other_Service);
      // get dynamic Icons added in xano
      if (Other_Service) {
        // console.log(
        //   bookingDetails?._actions_turbo?.Coupons_Services?.find(
        //     service => service?.name === serviceName,
        //   )?.service_icon?.url,
        //   'icon_url',
        // );
        return {
          uri: bookingDetails?._actions_turbo?.Coupons_Services?.find(
            service => service?.name === serviceName,
          )?.service_icon?.url,
        };
      } else {
        // get hard coded icons from frontend code
        return IMAGES[serviceNameKey];
      }
    },
    [isOther_Service, bookingDetails?._actions_turbo?.Coupons_Services],
  );

  const dispatch = useDispatch();

  // const serverData = {
  //   Start: '08',
  //   Minute_Start: '42',
  //   End: '22',
  //   Minute_End: '00',
  //   // Additional data from server...
  // }

  // // Function to convert server time to user's timezone
  // const convertTimeToUserTimezone = (serverData, serverTimezone, userTimezone) => {
  //   // Combine start and end times from the server data
  //   const startTime = `${serverData.Start}:${serverData.Minute_Start}`
  //   const endTime = `${serverData.End}:${serverData.Minute_End}`

  //   // Create moment objects for the starting and ending times
  //   // Assuming server times are in UTC
  //   const startMoment = moment.tz(startTime, 'HH:mm', serverTimezone)
  //   const endMoment = moment.tz(endTime, 'HH:mm', serverTimezone)

  //   // Convert the UTC times to the user's timezone
  //   const startUserTime = startMoment.tz(userTimezone)
  //   const endUserTime = endMoment.tz(userTimezone)

  //   return {
  //     startUserTime: startUserTime.format('HH:mm'), // Format the time as HH:mm
  //     endUserTime: endUserTime.format('HH:mm'), // Format the time as HH:mm
  //   }
  // }

  // // Define the server timezone (e.g., a timezone in Europe)
  // const serverTimezone = 'UTC' // Example timezone

  // // Get the user's timezone (you can retrieve this from device settings)
  // const userTimezone = getTimeZone() // Example timezone

  // // Convert the server times to the user's timezone
  // const userTimes = convertTimeToUserTimezone(serverData, serverTimezone, userTimezone)

  // console.log('User Start Time:', userTimes.startUserTime)
  // console.log('User End Time:', userTimes.endUserTime)

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule);
  };

  const handleContentBriefPress = () => {
    navigate(SCREEN_NAMES.ContentBriefScreen, {
      bookingDetails: bookingDetails,
    });
  };

  const handleSwipeSuccess = async () => {
    // const res = await updateBookingCheckinStatus(`/${bookingDetails?.id}`, {
    //   isCheckedIn: true,
    // });

    // if (res?.success) {
    //   console.log(
    //     'res_updateBookingCheckinStatus',
    //     res?.data?.isCheckedIn,
    //     res?.data.Approved,
    //     res?.data?.ApprovalStatus,
    //   );
    //   dispatch(updateCheckinStatus(res?.data));
    // }
    navigate(SCREEN_NAMES.ContentUploadGuide, {
      bookingDetails: bookingDetails,
    });
  };

  const handleOpenCouponPress = () => {
    navigate(SCREEN_NAMES.NewCouponScreen, {
      bookingDetails: bookingDetails,
    });
  };

  const handleAlertVisible = () => {
    if (approvalStage === 'reject') {
      // console.log('check_handleAlertVisible');
      return;
    }
    setIsAlertVisible(!isAlertVisible);
  };

  const handlePositiveBtnPress = async () => {
    try {
      setIsDeleting(true);
      const params = `/${bookingDetails?.id}`;
      // const params = `/${bookingDetails?.id}/clone_1`;
      const res = await cancelBooking(params);
      if (res?.id) {
        // console.log('res_cancelBooking', res);
        // return;
        dispatch(deleteCanceledBooking(res));
        const params = `/${loginData?.id}`;
        const bookingRes = await getBookings(params);
        if (bookingRes?.length > 0) {
          dispatch(setBookings(bookingRes));
        }

        const canceledBookingRes = await getAllCanceledBookings(params);
        if (canceledBookingRes?.length > 0) {
          dispatch(setCanceledBookings(canceledBookingRes));
        }

        setIsDeleting(false);
        setIsAlertVisible(false);
        // Alert.alert('Your booking is cancelled, move into archive');
        navigate(SCREEN_NAMES.ArchiveScreen);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!bookingDetails?.BookingDay) return;

    const myDate = new Date(bookingDetails?.BookingDay);

    const month = myDate.toLocaleString('en-US', {
      month: 'long',
      timeZone: 'UTC',
    });
    setCurrentMonth(month);

    const weekDay = myDate.toLocaleString('en-US', {
      weekday: 'long',
      timeZone: 'UTC',
    });
    setCurrentWeekDay(weekDay);

    setCurrentDate(myDate.getUTCDate());
  }, [bookingDetails?.BookingDay]); // Dependency array mein field daalna behtar hai

  const getAppInformation = useCallback(async () => {
    const res = await getAppInfo();
    // console.log('res_getAppInformation', res);

    dispatch(setAppInfo(res?.data));
  }, [dispatch]);

  useEffect(() => {
    getAppInformation();
  }, [getAppInformation]);

  return {
    actionNumId,
    actionName,
    amenityDetailsWithCoupons,
    approvalStage,
    bookingDetails,
    currentDate,
    currentMonth,
    currentWeekDay,
    isAlertVisible,
    isDeleting,
    isEvent,
    handleSwipeSuccess,
    handleAlertVisible,
    handleBackPress,
    handleOpenCouponPress,
    handleContentBriefPress,
    handlePositiveBtnPress,
    icon,
    timeFrame,
    getIcons,
    getServicesWithCoupons,
  };
};

export default useYourScheduleDetails;
