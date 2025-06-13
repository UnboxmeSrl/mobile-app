import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../../assets';
import {SCREEN_NAMES} from '../../../constants';
import {navigate} from '../../../services';
import {xanoImageSize} from '../../../utils';

const useNewCoupon = () => {
  const route = useRoute();
  const loginData = useSelector(state => state.authSlice.loginData);
  const bookingDetails = route.params?.bookingDetails;
  const navigation = useNavigation();
  const isReel = bookingDetails?.reel === '1';
  const bookingDate = new Date(bookingDetails?.BookingDay);
  const month = bookingDate.toLocaleString('en-US', {month: 'long'});
  const profilePicUrl = `${loginData?.Profile_pic?.url}?tpl=${xanoImageSize}.jpg`;
  const isEvent = bookingDetails?._restaurant_turbo?.is_event;
  const timeFrame =
    bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo;

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  }

  let amenityDetails = {};

  if (actionNumId === 7) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Beauty} X Treatment`,
      amenityIcon: IMAGES.beauty,
      // amenityDescription: 'at your choice',
    };
  } else if (actionNumId === 8 || actionNumId === 53) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Gym} X Pass`,
      amenityIcon: IMAGES.gym,
      // amenityDescription: 'at your choice',
    };
  } else if (actionNumId === 9) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Accomodation} x Days (${
        bookingDetails?._actions_turbo?.Accomodation - 1
      } nights)`,
      amenityIcon: IMAGES.resort,
      // amenityDescription: 'at your choice',
    };
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContentBriefPress = () => {
    navigate(SCREEN_NAMES.ContentBriefScreen, {
      bookingDetails: bookingDetails,
    });
  };

  const handleRestaurantRedirect = item => {
    const restaurantId = item?.id;
    const cityData = item?._cities;

    navigate(SCREEN_NAMES.RestaurantDetails, {
      restaurantId: restaurantId,
      cityData: cityData,
    });
  };

  const handleGoToContentPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen, {
      selectedTab: 2,
    });
  };

  return {
    isEvent,
    profilePicUrl,
    amenityDetails,
    actionNumId,
    actionName,
    bookingDate,
    bookingDetails,
    handleBackPress,
    handleGoToContentPress,
    handleContentBriefPress,
    handleRestaurantRedirect,
    icon,
    isReel,
    loginData,
    month,
    timeFrame,
  };
};

export default useNewCoupon;
