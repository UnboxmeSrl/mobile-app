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


const useMap = () => {
  const [search, setSearch] = useState('');

  return {search, setSearch};
};

export default useMap;
