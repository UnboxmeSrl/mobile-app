import {useFocusEffect, useRoute} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants';
import {navigate, showToastError, updateAction} from '../../../services';
import {useSelector} from 'react-redux';
import {selecteUserCoords} from '../../../redux';
import {calculateDis} from '../../../utils';
import {useRestaurants} from '../../Restaurants/hooks';
import {useCallback, useEffect, useState} from 'react';

const useContentUploadGuide = () => {
  const route = useRoute();
  const bookingDetails = route.params?.bookingDetails;
  const userLocation = useSelector(selecteUserCoords);
  const {requestLocationPermission} = useRestaurants();
  const [permissionError, setPermissionError] = useState('');

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
  const openCoupon = useCallback(
    async (lat, lng, userLat, userLng) => {
      const userDistantValue = calculateDis(lat, lng, userLat, userLng) * 1000;

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
        console.log('res_of_updateAction', res);
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
    },
    [bookingDetails],
  );
  const handleOpenCouponPress = useCallback(async () => {
    const userLng = userLocation?.[0];
    const userLat = userLocation?.[1];
    const lat = bookingDetails?.location?.data?.lat;
    const lng = bookingDetails?.location?.data?.lng;
    console.log(userLocation);
    if (userLat && userLng) {
      openCoupon(lat, lng, userLat, userLng);
    } else {
      const permission = await requestLocationPermission();
      console.log('permission', permission);
      if (permission === 'denied') {
        setPermissionError(
          'Enable permission from device settings to avail coupon',
        );
      } else if (permission === 'error') {
        setPermissionError('Something went wrong, try again');
      } else if (permission === 'granted') {
        setPermissionError('');
        openCoupon(lat, lng, userLat, userLng);
      }
    }
  }, [
    bookingDetails?.location?.data?.lat,
    bookingDetails?.location?.data?.lng,
    openCoupon,
    requestLocationPermission,
    userLocation,
  ]);

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
    permissionError,
  };
};

export default useContentUploadGuide;
