import { Dimensions, Platform } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
