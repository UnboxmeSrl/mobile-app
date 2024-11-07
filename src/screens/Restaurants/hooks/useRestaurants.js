import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {setRestaurantDetails, setUserCurrentLocation} from '../../../redux';
import {
  getCategories,
  getRestaurants,
  getSponsoredRestaurants,
} from '../../../services';
import {geolocationSetting} from '../../../utils';

const useRestaurants = () => {
  // const categoriesIds = useSelector(selectCategoryById)
  // const category = useSelector(selectAwardPrizeCategory)
  const isFocused = useIsFocused();
  // const cityData = useNavigationParam('cityData')
  const loginData = useSelector(state => state.authSlice.loginData);
  const cityData = useSelector(state => state.locationSlice.city);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEndLoading, setIsEndLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [restaurantApiCallData, setRestaurantApiCallData] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState(0);
  const [categories, setCategories] = useState([]);

  const [restaurantsData, setRestaurantsData] = useState([]);
  // const [userLocation, setUserLocation] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    getCategoriesData();
    getInitialRestaurantsData();
    setRefreshing(false);
  };

  const handleOnReached = () => {
    if (restaurantApiCallData?.nextPage) {
      setPage(restaurantApiCallData?.nextPage);
    } else {
      setIsEndLoading(false);
    }
  };

  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('location granted check', granted);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return Alert.alert(
            'Location Permission',
            'Location permission denied',
          );
        }
      } else {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted !== 'granted') {
          return Alert.alert(
            'Location Permission',
            'Location permission denied',
          );
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          dispatch(
            setUserCurrentLocation([
              position.coords.longitude,
              position.coords.latitude,
            ]),
          );
        },
        err => {
          console.log('err', err);
        },
        geolocationSetting,
      );
    } catch (err) {
      Alert.alert('Location Permission', 'Something went wrong!');
    }
  }, [dispatch]);

  // const getInitialSponsoredRestaurantsData = async () => {
  //   setIsLoading(true);
  //   const prepData = {
  //     category_venue_id: filter,
  //     city_id: cityData?.id,
  //     search: search,
  //   };
  //   const res = await getSponsoredRestaurants(prepData);
  //   setRestaurantApiCallData(res);
  //   setRestaurantsData(res?.items);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // };

  const getInitialRestaurantsData = async () => {
    setIsLoading(true);
    const sponsoredPrepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
      search: search,
      user_turbo_id: loginData?.id,
    };
    const sponsoredRes = await getSponsoredRestaurants(sponsoredPrepData);

    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
      page: 1,
      search: search,
      sponsored_data: true,
      ...(loginData?.id && {user_turbo_id: loginData.id}),
    };
    const res = await getRestaurants(prepData);
    setRestaurantApiCallData(res);
    setRestaurantsData([...sponsoredRes, ...res?.items]);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getRestaurantsData = async () => {
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
      page: page,
      search: search,
      sponsored_data: true,
      ...(loginData?.id && {user_turbo_id: loginData.id}),
    };
    const res = await getRestaurants(prepData);
    setRestaurantApiCallData(res);
    setRestaurantsData([...restaurantsData, ...res?.items]);
  };

  // const sortedRestaurants = useMemo(
  //   () =>
  //     (restaurantsData || [])
  //       .map(rest => {
  //         rest.distance =
  //           getDistance(
  //             userLocation,
  //             {latitude: rest.Latitude, longitude: rest.Longitude} || {},
  //           ) / 1000;
  //         return rest;
  //       })
  //       ?.sort((a, b) => {
  //         return a.distance - b.distance;
  //       }),
  //   [restaurantsData, userLocation],
  // );

  const getCategoriesData = async () => {
    setIsLoading(true);
    const res = await getCategories();
    console.log('res: ' + JSON.stringify(res));
    if (res?.data?.length > 0) {
      const addAllCategory = [
        {CategoryName: 'All categories', id: 0},
        ...res?.data,
      ];
      setCategories(addAllCategory);
    }
    setIsLoading(false);
  };

  const handleLocationPress = () => {
    navigation.replace(SCREEN_NAMES.Cities, {isFromOtherScreen: true});
  };

  const onCategoryChange = (idx, category) => {
    setSelectedIndex(idx);
    setFilter(category?.id);
  };

  useEffect(() => {
    if (page > 1) {
      getRestaurantsData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (search?.length > 0) {
      const timeoutID = setTimeout(() => {
        getInitialRestaurantsData();
        console.log('Testing Restaurant data');
      }, 2000);
      return () => clearTimeout(timeoutID);
    } else {
      getInitialRestaurantsData();
    }
  }, [search]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  useEffect(() => {
    getInitialRestaurantsData();
  }, [filter]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setRestaurantDetails({}));
    }
  }, [isFocused]);

  return {
    categories,
    // categoriesIds,
    // category,
    cityData,
    search,
    setSearch,
    filter,
    selectedIndex,
    handleLocationPress,
    handleOnReached,
    isLoading,
    isEndLoading,
    onCategoryChange,
    onRefresh,
    refreshing,
    // restaurantsData: sortedRestaurants,
    restaurantsData,
    setFilter,
    setRestaurantsData,
    requestLocationPermission,
    // userLocation,
  };
};

export default useRestaurants;
