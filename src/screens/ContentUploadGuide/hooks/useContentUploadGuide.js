import {useRoute} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants';
import {navigate, updateAction} from '../../../services';
import {useSelector} from 'react-redux';
import {selecteUserCoords} from '../../../redux';

const useContentUploadGuide = () => {
  const route = useRoute();
  const bookingDetails = route.params?.bookingDetails;
  const userLocation = useSelector(selecteUserCoords);

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  }

  const handleOpenCouponPress = async () => {
    const body = {
      location: {
        type: 'point',
        data: {
          lng: userLocation?.[0],
          lat: userLocation?.[1],
        },
      },
    };
    const res = await updateAction(bookingDetails?.id, body);
    if (res) {
      navigate(SCREEN_NAMES.NewCouponScreen, {
        bookingDetails: bookingDetails,
      });
    }
  };

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleDetailsScreen, {
      bookingDetails: bookingDetails,
    });
  };

  return {
    icon,
    actionName,
    bookingDetails,
    handleOpenCouponPress,
    handleBackPress,
  };
};

export default useContentUploadGuide;
