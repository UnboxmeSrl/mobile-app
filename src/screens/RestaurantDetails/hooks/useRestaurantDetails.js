import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';
import {
  getRestaurantDetails,
  getServiceCategories,
  navigate,
} from '../../../services';
import {SCREEN_NAMES} from '../../../constants';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {setRestaurantDetails} from '../../../redux';

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

  const getRestaurantDetailsData = async () => {
    setIsLoading(true);
    const prepData = {
      category_id: filter,
      restaurant_id: restaurantId,
      user_id: loginData?.id,
    };
    const res = await getRestaurantDetails(prepData);
    dispatch(setRestaurantDetails(res?.restaurant));
    setServices(res?.services);
    setIsLoading(false);
  };
  const filteredServices = useMemo(() => {
    // services
    const filterServices = services?.filter(el =>
      userDetails?.social_strength === 'tiktok'
        ? [6, 8, 12].includes(el.actions_turbo_id)
        : userDetails?.social_strength === 'instagram'
        ? [1, 5, 6, 16].includes(el.actions_turbo_id)
        : el,
    );
    return filterServices;
  }, [services, userDetails?.social_strength]);
  // console.log('services', JSON.stringify(services));
  console.log('filteredServices', JSON.stringify(filteredServices));

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
  }, [isFocused, filter]);

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
    filteredServices,
    handleRedirection,
  };
};

export default useRestaurantDetails;
