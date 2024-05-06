import {getDistance} from 'geolib';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {geolocationSetting} from '../../../utils';
import {getCategories, getRestaurants} from '../../../services';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const useRestaurants = () => {
  // const categoriesIds = useSelector(selectCategoryById)
  // const category = useSelector(selectAwardPrizeCategory)
  const isFocused = useIsFocused();
  // const cityData = useNavigationParam('cityData')
  const cityData = useSelector(state => state.locationSlice.city);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    getCategoriesData();
    getRestaurantsData();
    setRefreshing(false);
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
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        err => {
          console.log('err', err);
        },
        geolocationSetting,
      );
    } catch (err) {
      Alert.alert('Location Permission', 'Something went wrong!');
    }
  }, []);

  useEffect(() => {
    console.log('check useEffect n restarant screen');
    requestLocationPermission();
  }, [requestLocationPermission]);

  const getRestaurantsData = async () => {
    setIsLoading(true);
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
    };
    const res = await getRestaurants(prepData);
    setRestaurantsData(res);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const sortedRestaurants = useMemo(
    () =>
      (restaurantsData || [])
        .map(rest => {
          rest.distance =
            getDistance(
              userLocation,
              {latitude: rest.Latitude, longitude: rest.Longitude} || {},
            ) / 1000;
          return rest;
        })
        ?.sort((a, b) => {
          return a.distance - b.distance;
        }),
    [restaurantsData, userLocation],
  );

  const getCategoriesData = async () => {
    setIsLoading(true);
    const res = await getCategories();
    const addAllCategory = [
      {CategoryName: 'All categories', id: 0},
      ...res?.data,
    ];

    setCategories(addAllCategory);
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
    getRestaurantsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  return {
    categories,
    // categoriesIds,
    // category,
    cityData,
    filter,
    selectedIndex,
    handleLocationPress,
    isLoading,
    onCategoryChange,
    onRefresh,
    refreshing,
    restaurantsData: sortedRestaurants,
    setFilter,
    userLocation,
  };
};

export default useRestaurants;
