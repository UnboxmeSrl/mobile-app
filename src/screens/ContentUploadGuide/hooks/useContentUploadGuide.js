import {useRoute} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants';
import {navigate, showToastError, updateAction} from '../../../services';
import {useSelector} from 'react-redux';
import {selecteUserCoords} from '../../../redux';
import {calculateDis} from '../../../utils';

const useContentUploadGuide = () => {
  const route = useRoute();
  const bookingDetails = route.params?.bookingDetails;
  const userLocation = useSelector(selecteUserCoords);

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;
  let actionDescription = bookingDetails?._actions_turbo?.Descrizione ?? '';

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  }

  const handleOpenCouponPress = async () => {
    const userLng = userLocation?.[0];
    const userLat = userLocation?.[1];
    const lat = bookingDetails?.location?.data?.lat;
    const lng = bookingDetails?.location?.data?.lng;
    const userDistantValue = calculateDis(lat, lng, userLat, userLng) * 1000;
    // const userDistantValue =
    //   calculateDis(37.27651669260897, -122.04641848163368, userLat, userLng) *
    //   1000;
    // console.log(
    //   'bookingDetails',
    //   userDistantValue,
    //   lat,
    //   lng,
    //   userLat,
    //   userLng,
    //   bookingDetails?.coupon_status,
    //   bookingDetails,
    // );
    if (bookingDetails?.coupon_status === 'showed') {
      console.log('checkShowed_block');
      navigate(SCREEN_NAMES.NewCouponScreen, {
        bookingDetails: bookingDetails,
      });
    } else if (
      bookingDetails?.coupon_status !== 'not_show' &&
      userDistantValue <= 200
    ) {
      // const body = {
      //   location: {
      //     type: 'point',
      //     data: {
      //       lng: userLocation?.[0],
      //       lat: userLocation?.[1],
      //     },
      //   },
      // };

      // return;
      const body = {
        coupon_status: 'showed',
      };

      const res = await updateAction(bookingDetails?.id, body);
      if (res) {
        navigate(SCREEN_NAMES.NewCouponScreen, {
          bookingDetails: bookingDetails,
        });
      }
    } else {
      // console.log(
      //   'bookingDetails_handleOpenCouponPress',
      //   JSON.stringify(bookingDetails),
      // );
      if (bookingDetails?.coupon_status === 'not_show') {
        showToastError({message: 'coupon expired'});
      } else {
        showToastError({
          message: 'Coupon is not valid at this location',
        });
      }
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
    actionDescription,
    bookingDetails,
    handleOpenCouponPress,
    handleBackPress,
  };
};

export default useContentUploadGuide;
