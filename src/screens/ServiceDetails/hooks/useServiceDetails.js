import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../../assets';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import {setTimeFrameData} from '../../../redux';
import {
  getDiaryActions,
  getServiceDealsLeft,
  getTimeFrames,
  navigate,
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
  let amenityDetails = {};

  if (actionNumId === 7) {
    amenityDetails = {
      amenityName: `${serviceDetails?._actions_turbo?.Beauty} X Treatment`,
      amenityIcon: IMAGES.beauty,
      amenityDescription: serviceDetails?.at_offername,
    };
  } else if (actionNumId === 8) {
    amenityDetails = {
      amenityName: `${serviceDetails?._actions_turbo?.Gym} X Pass`,
      amenityIcon: IMAGES.gym,
      amenityDescription: 'at your choice',
    };
  } else if (actionNumId === 9) {
    amenityDetails = {
      amenityName: `${serviceDetails?._actions_turbo?.Accomodation} x Days (${
        serviceDetails?._actions_turbo?.Accomodation - 1
      } nights)`,
      amenityIcon: IMAGES.resort,
      amenityDescription: 'at your choice',
    };
  }

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
    const params = `/${restaurantDetails?.id}`;
    const res = await getTimeFrames(params);
    setTimeout(() => {
      dispatch(setTimeFrameData(res));
    }, 1000);
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
        // This setTimeout is important because till that time timeframe data is settled in redux so don't remove it.
        setTimeout(() => {
          setIsBookBtnPressed(false);
          navigate(SCREEN_NAMES.BookingDetails, {
            actionNumId: actionNumId,
            influencerCount: influencerCount,
          });
        }, 1000);
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
    amenityDetails,
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
