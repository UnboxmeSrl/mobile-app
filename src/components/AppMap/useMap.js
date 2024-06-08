// import { Categories } from '@components/Categories'
import Mapbox from '@rnmapbox/maps';
import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Api} from '../../constants';
import {getNearerRestaurants} from '../../services';
import {setNearerRestaurants} from '../../redux';
import {useDispatch} from 'react-redux';

const useMap = () => {
  const dispatch = useDispatch();
  const handleGetNearerHotels = useCallback(
    async currentLocation => {
      if (currentLocation) {
        const res = await getNearerRestaurants({...currentLocation});
        if (res?.success) {
          console.log('nearer Restaurant', res.data);
          dispatch(setNearerRestaurants(res.data));
        }
      }
    },
    [dispatch],
  );
  return {handleGetNearerHotels};
};
export default useMap;
