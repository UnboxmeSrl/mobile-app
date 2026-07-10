import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../../assets';
import {SCREEN_NAMES} from '../../../constants';
import {navigate} from '../../../services';
import {xanoImageSize} from '../../../utils';
import {useCallback, useMemo} from 'react';

const useNewCoupon = () => {
  const route = useRoute();
  const loginData = useSelector(state => state.authSlice.loginData);
  const bookingDetails = route.params?.bookingDetails;
  const navigation = useNavigation();
  const isReel = bookingDetails?.reel === '1';
  const bookingDate = new Date(bookingDetails?.BookingDay);
  const month = bookingDate.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  const profilePicUrl = `${loginData?.Profile_pic?.url}?tpl=${xanoImageSize}.jpg`;
  const isEvent = bookingDetails?._restaurant_turbo?.is_event;
  const timeFrame =
    bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo;
  const isVenueDealBooking = !!bookingDetails?.isVenueDealBooking;

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  } else if (isVenueDealBooking) {
    icon = bookingDetails?._offers_turbo?.Offer_Cover?.url;
    actionName = bookingDetails?._offers_turbo?.Offer_Name || 'Venue deal';
  }

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
            amenityName: `${bookingDetails._actions_turbo.Gym} X Pass`,
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
    bookingDetails?._actions_turbo?.Accomodation,
    bookingDetails?._actions_turbo?.Beauty,
    bookingDetails?._actions_turbo?.Gym,
    bookingDetails?._actions_turbo?.Coupons_Services,
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
      bookingDetails?._offers_turbo?.services?.length,
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
      console.log('Other_Service', serviceNameKey, Other_Service);
      // get dynamic Icons added in xano
      if (Other_Service) {
        console.log(
          bookingDetails?._actions_turbo?.Coupons_Services?.find(
            service => service?.name === serviceName,
          )?.service_icon?.url,
          'icon_url',
        );
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
    amenityDetailsWithCoupons,
    getServicesWithCoupons,
    isOther_Service,
    getIcons,
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
