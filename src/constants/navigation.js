import { BoxContentUploadScreen } from '@screens/BoxContantUpload'

import { COLORS } from '@const'

export const MAIN_NAVIGATOR = 'mainNavigator'

export const STACK_NAMES = {
  BottomStack: 'BottomStack',
}
export const MODAL_NAMES = {
  AuthPhone: 'AuthPhone',
  Box: 'Box',
  Congratulations: 'Congratulations',
  FillQuestionnaire: 'FillQuestionnaire',
  ForgotPassword: 'ForgotPassword',
  Login: 'Login',
  QuestionnaireThankYou: 'QuestionnaireThankYou',
  SignInEmail: 'SignInEmail',
  SignUpEmail: 'SignUpEmail',
  SignUpPhone: 'SignUpPhone',
  Tiktok: 'Tiktok',
  WebView: 'WebView',
}
export const SCREEN_NAMES = {
  AddNewAddress: 'AddNewAddress',
  Addresses: 'Addresses',
  Awards: 'Awards',
  BoxBrief: 'BoxBrief',
  BoxBrief2: 'BoxBrief2',
  BoxContentUploadScreen: 'BoxContentUploadScreen',
  Home: 'Home',
  Onboarding: 'Onboarding',
  OtherSignUp: 'OtherSignUp',
  ProductSelection: 'ProductSelection',
  Questionnaire: 'Questionnaire',
  Settings: 'Settings',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Wizard: 'Wizard',
}
export const DEFAULT_SCREEN_NAME = STACK_NAMES.BottomStack
export const COMMON_STATUS_BAR = {
  backgroundColor: 'transparent',
  translucent: true,
}
export const LIGHT_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'light-content',
}
export const DARK_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'dark-content',
}

export const tabBarOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: 'gray',
}
