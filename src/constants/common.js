import { Dimensions, Platform } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'
export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const YES_OPTION = {
  tKeyLabel: 'yes',
  value: true,
}
const NO_OPTION = {
  tKeyLabel: 'no',
  value: false,
}

export const YES_NO_OPTIONS = [YES_OPTION, NO_OPTION]
