import Clipboard from '@react-native-clipboard/clipboard';
import {SCREEN_NAMES} from '../../../constants';
import {navigate, showToastSuccess} from '../../../services';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectBookingsByID} from '../../../redux';
import {getActionIconSource} from '../../../utils';

const useContentBrief = () => {
  const route = useRoute();
  const bookingDetailsParams = route.params?.bookingDetails || {};
  const bookingId = bookingDetailsParams?.id;
  const bookingDetail = useSelector(selectBookingsByID(bookingId));
  const bookingDetails = {...bookingDetailsParams, ...(bookingDetail || {})};

  const isReel = bookingDetails?.reel === '1';
  console.log('isReel', isReel, bookingDetails, bookingId);

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon =
    getActionIconSource(bookingDetails?._actions_turbo) ||
    bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url
      ? {uri: bookingDetails?._diary_action_turbo?.action_icon?.url}
      : icon;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  } else if (bookingDetails?.isVenueDealBookingAction) {
    icon = getActionIconSource(bookingDetails?._actions_turbo);
    actionName = bookingDetails?._actions_turbo?.Action_Name || 'Deal action';
  }

  const handleTagCopyPress = copyText => {
    Clipboard.setString(copyText);
    showToastSuccess('Text copied successfully!');
  };

  const handleOpenCouponPress = () => {
    navigate(SCREEN_NAMES.NewCouponScreen, {
      bookingDetails: bookingDetails,
    });
  };

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen);
  };

  return {
    actionNumId,
    actionName,
    bookingDetails,
    handleBackPress,
    handleOpenCouponPress,
    icon,
    isReel,
    handleTagCopyPress,
  };
};

export default useContentBrief;
