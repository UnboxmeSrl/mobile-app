import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../../assets';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import {resetAuthData, setTimeFrameData} from '../../../redux';
import {
  getDiaryActions,
  getServiceDealsLeft,
  getTimeFrames,
  navigate,
  showToastError,
} from '../../../services';

const useServiceDetails = () => {
  const route = useRoute();
  const isFromBookRedirected = route.params?.isFromBookRedirected;
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authSlice.loginData);
  const socialActions = useSelector(
    state => state.restaurantSlice.socialActions,
  );
  // const categoriesIds = useSelector(selectCategoryById)
  const serviceDetails = useSelector(
    state => state.restaurantSlice.serviceDetails,
  );
  const restaurantDetails = useSelector(
    state => state.restaurantSlice.restaurantDetails,
  );
  // console.log('restaurantDetails', restaurantDetails);
  const userInstagramFollowers = loginData?.instagram_followers;
  const userTiktokFollowers = loginData?.tiktok_followers;
  const minInstagramFollowers = restaurantDetails?.min_instagram_followers;
  const minTiktokFollowers = restaurantDetails?.min_tiktok_followers;

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [diaryItems, setDiaryItems] = useState([]);
  const [filter, setFilter] = useState(0);
  const [dealsLeft, setDealsLeft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBookBtnPressed, setIsBookBtnPressed] = useState(false);
  const [influencerCount, setInfluencerCount] = useState(1);
  const actionNumId = serviceDetails?._actions_turbo?.action_num_id;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // let amenityDetailsWithCoupons = {};
  const WeekDays = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const amenityDetailsWithCoupons = useMemo(() => {
    const list = [];
    if ([7, 10, 14, 15, 16, 17, 8, 53, 54, 9].includes(actionNumId)) {
      // Primary amenities
      if ([7, 10, 14, 15, 16, 17].includes(actionNumId)) {
        if (serviceDetails?._actions_turbo?.Beauty) {
          list.push({
            amenityName: `${serviceDetails._actions_turbo.Beauty} X Treatment`,
            amenityIcon: IMAGES.beauty,
          });
        }
      }

      if ([8, 53, 54].includes(actionNumId)) {
        if (serviceDetails?._actions_turbo?.Gym) {
          list.push({
            amenityName: `${serviceDetails._actions_turbo.Gym} X Pass`,
            amenityIcon: IMAGES.gym,
          });
        }
      }

      if (actionNumId === 9 && serviceDetails?._actions_turbo?.Accomodation) {
        const days = serviceDetails._actions_turbo.Accomodation;
        list.push({
          amenityName: `${days} x Days (${days - 1} nights)`,
          amenityIcon: IMAGES.resort,
        });
      }

      // Other services
      serviceDetails?._actions_turbo?.Coupons_Services?.forEach(service => {
        if (service?.quantity > 0) {
          list.push({
            amenityName: `${service.quantity} X ${service.name}`,
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
    serviceDetails._actions_turbo.Accomodation,
    serviceDetails._actions_turbo.Beauty,
    serviceDetails._actions_turbo.Gym,
    serviceDetails._actions_turbo?.Coupons_Services,
  ]);
  // console.log('actionNumId_useServiceDetials', actionNumId);
  // if (serviceDetails?._actions_turbo?.Beauty > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${serviceDetails?._actions_turbo?.Beauty} X Treatment`,
  //     amenityIcon: IMAGES.beauty,
  //     // amenityDescription: serviceDetails?.at_offername,
  //   };
  // } else if (serviceDetails?._actions_turbo?.Gym > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${serviceDetails?._actions_turbo?.Gym} X Pass`,
  //     amenityIcon: IMAGES.gym,
  //     // amenityDescription: 'at your choice',
  //   };
  // } else if (serviceDetails?._actions_turbo?.Accomodation > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${serviceDetails?._actions_turbo?.Accomodation} x Days (${
  //       serviceDetails?._actions_turbo?.Accomodation - 1
  //     } nights)`,
  //     amenityIcon: IMAGES.resort,
  //     // amenityDescription: 'at your choice',
  //   };
  // }

  const getServiceDealsLeftData = async () => {
    const prepData = {
      offers_turbo_id: serviceDetails?.id,
      restaurant_turbo_id: restaurantDetails?.id,
    };
    const res = await getServiceDealsLeft(prepData);
    let deals;
    if (res?.status === 200) {
      deals = `${res?.deal_left} deal left`;
    }
    // else if (res?.status === 201) {
    //   deals = `No deal limit`
    // }

    setDealsLeft(deals);
    setIsLoading(false);
  };

  // const getServiceCategoriesData = async () => {
  //   const res = await getServiceCategories()
  //   const filteredCatNames = res?.map((cat) => {
  //     const tmp = {
  //       ...cat,
  //       CategoryName: cat?.Category_type,
  //     }
  //     return tmp
  //   })
  //   const addAllCategory = [{ CategoryName: 'All categories', id: 0 }, ...filteredCatNames]
  //   setServiceCategories(addAllCategory)
  // }

  const getDiaryActionsData = async () => {
    const res = await getDiaryActions();
    setDiaryItems(res);
  };

  const getTimeFrameData = async () => {
    // console.log('serviceDetails', serviceDetails?._timeframes_turbo);
    // if (serviceDetails?._timeframes_turbo?.id) {
    //   dispatch(setTimeFrameData([serviceDetails?._timeframes_turbo]));
    // } else {

    const offer_id = serviceDetails?.id;
    const endpoint = `/${restaurantDetails?.id}?`;
    const queryParams = 'offer_id=' + offer_id; // Query params
    const urlParams = `${endpoint}${queryParams}`;
    console.log('urlParams', offer_id, urlParams);
    const res = await getTimeFrames(urlParams);
    // console.log('resIn_getTimeFrameData', JSON.stringify(res));
    // const timeGroups = () => {
    //   return (res || [])?.reduce((acc, item) => {
    //     if (item) {
    //       if (item.DayOfWeek) {
    //         acc[item.DayOfWeek] = acc[item.DayOfWeek] || [];
    //         acc[item.DayOfWeek].push(item);
    //       }

    //       const filteredWeekdays = item.weekdays.filter(
    //         day =>
    //           !item?.pause_days.some(pauseDay => pauseDay?.day === day?.day),
    //       );

    //       filteredWeekdays?.forEach(daynum => {
    //         const dayOfWeek = WeekDays[daynum.day];
    //         if (dayOfWeek && item.DayOfWeek !== dayOfWeek) {
    //           acc[dayOfWeek] = acc[dayOfWeek] || [];
    //           acc[dayOfWeek].push(item);
    //         }
    //       });
    //     }
    //     return acc;
    //   }, {});
    // };
    // const updatedTimeframeData = timeGroups();
    // console.log('timeGroups', updatedTimeframeData);
    dispatch(setTimeFrameData(res || []));

    //   const correctTimeFramesResponse = await getTimeFrames(
    //     `/${serviceDetails?.id}`,
    //     true,
    //   );
    //   const correctItems =
    //     correctTimeFramesResponse?.data?.timeframesTurbo_Id.map(
    //       correctItem => correctItem.id,
    //     );
    //   console.log('correctTimeFramesResponse', correctTimeFramesResponse, res);
    //   const result = (res || []).filter(item => correctItems.includes(item.id));

    //   setTimeout(() => {
    //     dispatch(setTimeFrameData(result));
    //   }, 1000);
    // }
  };

  // const onCategoryChange = (serviceCategoryId) => {
  //   console.log('Category change', serviceCategoryId)
  //   setFilter(serviceCategoryId)
  // }

  const handleBackPress = () => {
    if (isFromBookRedirected) {
      navigation.replace(STACK_NAMES.BottomStack, {
        isFromBookRedirected: true,
      });
    } else {
      navigation.goBack();
    }
  };

  const handleBookPress = () => {
    setIsBookBtnPressed(true);
    if (loginData?.id) {
      if (loginData?.UserStatus === 'approved') {
        if (
          userInstagramFollowers >= minInstagramFollowers &&
          userTiktokFollowers >= minTiktokFollowers
        ) {
          // This setTimeout is important because till that time timeframe data is settled in redux so don't remove it.
          getTimeFrameData();
          setTimeout(() => {
            setIsBookBtnPressed(false);
            navigate(SCREEN_NAMES.BookingDetails, {
              actionNumId: actionNumId,
              influencerCount: influencerCount,
            });
          }, 1000);
        } else {
          const error = {
            message: `At least ${minInstagramFollowers} Instagram & ${minTiktokFollowers} Tiktok followers required for this service`,
            type: 'error',
          };
          showToastError(error);
          setIsBookBtnPressed(false);
        }
      } else {
        Toast.show({
          text1: 'Your Account is not yet approved',
          type: 'error',
        });
      }
    } else {
      setIsBookBtnPressed(false);
      navigate(SCREEN_NAMES.SignUpNew, {
        isFromBookRedirected: true,
      });
    }
  };

  const handleInfluencerPlus = () => {
    setInfluencerCount(influencerCount + 1);
  };

  const handleInfluencerMinus = () => {
    if (influencerCount > 1) {
      setInfluencerCount(influencerCount - 1);
    }
  };

  useEffect(() => {
    // getServiceCategoriesData()
    // getServicesData()
    getDiaryActionsData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getServiceDealsLeftData();
      getTimeFrameData();
    }
  }, [isFocused]);

  return {
    actionNumId,
    amenityDetailsWithCoupons,
    socialActions,
    // categoriesIds,
    dealsLeft,
    diaryItems,
    // filter,
    handleBackPress,
    handleBookPress,
    isBookBtnPressed,
    isImageLoading,
    isLoading,
    // onCategoryChange,
    serviceCategories,
    serviceDetails,
    setIsImageLoading,
    influencerCount,
    handleInfluencerPlus,
    handleInfluencerMinus,
  };
};

export default useServiceDetails;
