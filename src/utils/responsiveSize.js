/* eslint-disable camelcase */
import {Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
const designResolution = {
  width: 390,
  height: 844,
};
export const perfectSize = create(designResolution);

export default perfectSize;

export const {height: DEVICE_height, width: DEVICE_WIDTH} =
  Dimensions.get('window');
