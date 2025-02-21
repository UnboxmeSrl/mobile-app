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
    console.log('check_requestLocationPermission');
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(
          //   'userCurr_LatLng',
          //   position.coords.longitude,
          //   position.coords.latitude,
          // );
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
    };
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('PermissionsAndroid_RESULTS', PermissionsAndroid.RESULTS);
        console.log(
          'PermissionsAndroid_RESULTS_GRANTED',
          PermissionsAndroid.RESULTS.GRANTED,
          PermissionsAndroid.RESULTS.DENIED,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentPosition();
          return 'granted';
        } else {
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            return 'denied';
          }
        }
      } else {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        console.log('check_granted_requestLocationPermission', granted);
        if (granted === 'granted') {
          getCurrentPosition();
          return 'granted';
        } else {
          return 'denied';
        }
      }
    } catch (err) {
      return 'error';
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
    // console.log('sponsoredRes', sponsoredRes);
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
      page: 1,
      search: search,
      sponsored_data: true,
      ...(loginData?.id && {user_turbo_id: loginData.id}),
    };
    const res = await getRestaurants(prepData);
    // console.log('check_getRestaurants_getInitialRestaurantsData', res);
    setRestaurantApiCallData(res);
    setRestaurantsData([...sponsoredRes, ...(res?.items || [])]);
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
    // console.log('check_getRestaurants_getRestaurantsData', res);
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
    // console.log('resIn_getCategoriesData: ' + JSON.stringify(res));
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
      // console.log('check_getRestaurants_useEffect');
      getRestaurantsData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (search?.length > 0) {
      const timeoutID = setTimeout(() => {
        getInitialRestaurantsData();
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
  }, [dispatch, isFocused]);

  // reset page to 1 if tab  change
  useEffect(() => {
    setPage(1);
  }, [selectedIndex]);

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
