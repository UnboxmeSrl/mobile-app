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
  InviteFriends: 'InviteFriends',
  Login: 'Login',
  QuestionnaireThankYou: 'QuestionnaireThankYou',
  SignInEmail: 'SignInEmail',
  SignUpEmail: 'SignUpEmail',
  SignUpPhone: 'SignUpPhone',
  SpecialAwards: 'SpecialAwards',
  Tiktok: 'Tiktok',
  Timeslots: 'Timeslots',
  WebView: 'WebView',
  YourRating: 'YourRating',
}
export const SCREEN_NAMES = {
  AddCode: 'AddCode',
  AddNewAddress: 'AddNewAddress',
  Addresses: 'Addresses',
  AwardScreen: 'AwardScreen',
  BookingDetails: 'BookingDetails',
  BookingOnApprovalScreen: 'BookingOnApprovalScreen',
  BoxBrief: 'BoxBrief',
  BoxBrief2: 'BoxBrief2',
  BoxContentUploadScreen: 'BoxContentUploadScreen',
  Cities: 'Cities',
  ContentApproved: 'ContentApproved',
  Coupons: 'Coupons',
  EditProfile: 'EditProfile',
  Home: 'Home',
  Onboarding: 'Onboarding',
  OtherSignUp: 'OtherSignUp',
  Prizes: 'Prizes',
  ProductSelection: 'ProductSelection',
  Profile: 'Profile',
  Questionnaire: 'Questionnaire',
  ContentScreen: 'ContentScreen',
  RestaurantDetails: 'RestaurantDetails',
  Restaurants: 'Restaurants',
  Schedule: 'Schedule',
  ServiceDetails: 'ServiceDetails',
  Settings: 'Settings',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Wizard: 'Wizard',
  YourScheduleDetailsScreen: 'YourScheduleDetailsScreen',
  YourScheduleScreen: 'YourScheduleScreen',
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
