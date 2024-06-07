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

const useMap = () => {
  const [search, setSearch] = useState('');
  const handleGetNearerHotels = async currentLocation => {
    if (currentLocation) {
      const res = await getNearerRestaurants({...currentLocation});
      if (res.success) {
        console.log('nearer Restaurant', res);
        setNearerRestaurants(res.data);
      }
    }
  };
  return {search, setSearch, handleGetNearerHotels};
};
export default useMap;
