import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';
import {
  getRestaurantDeals,
  getRestaurantDetails,
  getServiceCategories,
  navigate,
} from '../../../services';
import {SCREEN_NAMES} from '../../../constants';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {setRestaurantDetails} from '../../../redux';

const getFallbackActionName = action => {
  switch (action?.action_id) {
    case 1:
      return 'Story';
    case 2:
      return 'Maps';
    case 3:
      return 'Tripadvisor';
    case 4:
      return 'TikTok';
    case 5:
      return 'Post Gallery';
    default:
      return action?.action_name || action?.name || 'Deal';
  }
};

const getActionDetails = (action, actionsById) =>
  actionsById?.[action?.action_id] || {};

const getActionName = (action, actionDetails) =>
  actionDetails?.title ||
  action?.Action_Name ||
  action?.action_name ||
  action?.name ||
  getFallbackActionName(action);

const getActionDescription = (deal, action, actionDetails) =>
  action?.content_instructions ||
  actionDetails?.content_instructions ||
  actionDetails?.description ||
  action?.Descrizione ||
  action?.description ||
  deal?.content_instructions ||
  deal?.description ||
  '';

const getActionIcon = actionDetails => {
  const icon = actionDetails?.icon;

  if (!icon) {
    return undefined;
  }

  if (typeof icon === 'string') {
    return {url: icon};
  }

  if (icon?.url) {
    return {url: icon.url};
  }

  return undefined;
};

const mapDealAction = (deal, action, actionsById) => {
  const actionDetails = getActionDetails(action, actionsById);

  return {
    ...action,
    action: actionDetails,
    action_num_id: action?.action_id,
    Action_Name: getActionName(action, actionDetails),
    Action_icon:
      getActionIcon(actionDetails) ||
      action?.Action_icon ||
      action?.action_icon,
    Descrizione: getActionDescription(deal, action, actionDetails),
  };
};

const getPerkName = perk =>
  perk?.name ||
  perk?.title ||
  perk?.perk?.title ||
  perk?.perk?.name ||
  perk?._perk?.name ||
  perk?._perk?.title ||
  (perk?.perk_id ? `Perk #${perk.perk_id}` : 'Perk');

const getPerkDetails = (perk, perksById) => perksById?.[perk?.perk_id] || {};

const getPerkIcon = perkDetails => {
  const icon = perkDetails?.icon;

  if (!icon) {
    return undefined;
  }

  if (typeof icon === 'string') {
    return {url: icon};
  }

  if (icon?.url) {
    return {url: icon.url};
  }

  return undefined;
};

const mapDealPerks = (deal, perksById) =>
  (deal?.actions || []).flatMap(action =>
    (action?.perks || []).map(perk => {
      const perkDetails = getPerkDetails(perk, perksById);

      return {
        ...perk,
        perk: perkDetails,
        name: getPerkName({...perk, perk: perkDetails}),
        quantity: Number(perk?.quantity || 0),
        service_icon: getPerkIcon(perkDetails) || perk?.service_icon,
      };
    }),
  );

const mapVenueDealToService = (deal, perksById, actionsById) => {
  const actions = deal?.actions || [];
  const mainAction =
    actions.find(action => action?.action_role === 'main') || actions[0] || {};
  const mainActionDetails = getActionDetails(mainAction, actionsById);
  const mappedActions = actions.map(action =>
    mapDealAction(deal, action, actionsById),
  );
  const paidAction = actions.find(action => action?.coin_amount != null);
  const credits = paidAction?.coin_amount ?? mainAction?.coin_amount ?? 0;
  const actionName = getActionName(mainAction, mainActionDetails);
  const actionDescription = getActionDescription(
    deal,
    mainAction,
    mainActionDetails,
  );
  const actionNumId = mainAction?.action_id || actions[0]?.action_id;
  const dealLimit = Number(deal?.daily_cap || 0);
  const perks = mapDealPerks(deal, perksById);

  return {
    ...deal,
    id: deal?.id,
    actions_turbo_id: actionNumId,
    at_offer_description: deal?.content_instructions || deal?.description || '',
    Credits: credits,
    Deal_limit: dealLimit,
    deal_done: 0,
    Description: deal?.description || actionDescription,
    Deal_Title: deal?.title,
    Offer_Cover: deal?.cover_image,
    services: perks,
    isVenueDeal: true,
    venueDeal: deal,
    _actions_turbo: {
      action_num_id: actionNumId,
      action: mainActionDetails,
      Action_Name: actionName,
      Action_icon:
        getActionIcon(mainActionDetails) ||
        mainAction?.Action_icon ||
        mainAction?.action_icon ||
        {},
      actions_turbo_id: mappedActions,
      Coupons_Services: perks,
      Descrizione: actionDescription,
      Days_deadline: mainAction?.deadline_days || '',
      Other_Services: perks,
    },
  };
};

const useRestaurantDetails = () => {
  const restaurantDetails = useSelector(
    state => state.restaurantSlice.restaurantDetails,
  );
  const userDetails = useSelector(state => state.authSlice?.loginData);
  const route = useRoute();
  const restaurantId = route?.params?.restaurantId;
  const [services, setServices] = useState([]);
  const cityData = route.params?.cityData;
  const [isLoading, setIsLoading] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [filter, setFilter] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const loginData = useSelector(state => state.authSlice.loginData);
  const perks = useSelector(state => state.serviceSlice?.perks || []);
  const dealActions = useSelector(state => state.serviceSlice?.actions || []);
  const perksById = useMemo(
    () =>
      perks.reduce((acc, perk) => {
        acc[perk.id] = perk;
        return acc;
      }, {}),
    [perks],
  );
  const actionsById = useMemo(
    () =>
      dealActions.reduce((acc, action) => {
        acc[action.id] = action;
        return acc;
      }, {}),
    [dealActions],
  );

  const getRestaurantDetailsData = async () => {
    setIsLoading(true);
    const prepData = {
      category_id: filter,
      restaurant_id: restaurantId,
      user_id: loginData?.id,
    };
    const [res, dealsRes] = await Promise.all([
      getRestaurantDetails(prepData),
      getRestaurantDeals(restaurantId),
    ]);
    const venueDeals = (dealsRes?.items || [])
      .filter(deal => !deal?.status || deal?.status === 'active')
      .map(deal => mapVenueDealToService(deal, perksById, actionsById));
    const legacyServices = res?.services || [];

    dispatch(setRestaurantDetails(res?.restaurant));
    setServices([...venueDeals, ...legacyServices]);
    setIsLoading(false);
  };
  // const filteredServices = useMemo(() => {
  //   console.log(
  //     'services',
  //     services?.map(e => e._actions_turbo?.Type),
  //   );
  //   const filterServices = services?.filter(el =>
  //     userDetails?.social_strength === 'tiktok'
  //       ? ['tiktok', 'both']?.includes(el._actions_turbo?.Type)
  //       : userDetails?.social_strength === 'instagram'
  //       ? ['instagram', 'both']?.includes(el._actions_turbo?.Type)
  //       : el,
  //   );
  //   return filterServices;
  // }, [services, userDetails?.social_strength]);

  // const filteredServices = useMemo(() => {
  //   // services
  //   const filterServices = services?.filter(el =>
  //     userDetails?.social_strength === 'tiktok'
  //       ? [6, 8, 12].includes(el.actions_turbo_id)
  //       : userDetails?.social_strength === 'instagram'
  //       ? [1, 5, 6, 16].includes(el.actions_turbo_id)
  //       : el,
  //   );
  //   return filterServices;
  // }, [services, userDetails?.social_strength]);
  // console.log('services', JSON.stringify(services));
  // console.log('filteredServices', JSON.stringify(filteredServices));

  const getServiceCategoriesData = async () => {
    const res = await getServiceCategories();
    const filteredCatNames = res?.map(cat => {
      const tmp = {
        ...cat,
        CategoryName: cat?.Category_type,
      };
      return tmp;
    });
    const addAllCategory = [
      {CategoryName: 'All categories', id: 0},
      ...filteredCatNames,
    ];
    setServiceCategories(addAllCategory);
  };

  const onCategoryChange = serviceCategoryId => {
    setFilter(serviceCategoryId);
  };

  const handleBackPress = () => {
    if (cityData?.id) {
      navigate(SCREEN_NAMES.Restaurants, {
        cityData: cityData,
      });
    } else {
      navigate(SCREEN_NAMES.Restaurants);
    }
  };

  const handleRedirection = targetUrl => {
    if (targetUrl) {
      Linking.openURL(targetUrl);
    }
  };

  useEffect(() => {
    getServiceCategoriesData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getRestaurantDetailsData();
    }
  }, [isFocused, filter, perksById, actionsById]);

  return {
    isLoading,
    filter,
    isImageLoading,
    setIsImageLoading,
    handleBackPress,
    onCategoryChange,
    restaurantDetails,
    serviceCategories,
    services,
    // filteredServices,
    handleRedirection,
  };
};

export default useRestaurantDetails;
