import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getCities} from '../../../services';

const useCities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const city = useSelector(state => state.locationSlice.city);
  const route = useRoute();
  // const isFromOtherScreen = useNavigationParam('isFromOtherScreen')
  const isFromOtherScreen = route.params?.isFromOtherScreen;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    getCitiesData();
    setRefreshing(false);
  };

  const getCitiesData = async () => {
    setIsLoading(true);
    const res = await getCities();
    // console.log('test', res);
    setLocationData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    if (city?.id && !isFromOtherScreen) {
      navigation.replace(SCREEN_NAMES.Restaurants, {cityData: city});
    } else {
      getCitiesData();
    }
  }, []);

  return {
    isLoading,
    locationData,
    refreshing,
    onRefresh,
  };
};

export default useCities;
