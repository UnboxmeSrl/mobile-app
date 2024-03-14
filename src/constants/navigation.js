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
  ArchiveScreen: 'ArchiveScreen',
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
  ContentBriefScreen: 'ContentBriefScreen',
  ContentScreen: 'ContentScreen',
  Coupons: 'Coupons',
  EditProfile: 'EditProfile',
  Home: 'Home',
  Onboarding: 'Onboarding',
  OnboardingNew: 'OnboardingNew',
  OtherSignUp: 'OtherSignUp',
  Prizes: 'Prizes',
  ProductSelection: 'ProductSelection',
  PublishContentScreen: 'PublishContentScreen',
  Profile: 'Profile',
  Questionnaire: 'Questionnaire',
  NewCouponScreen: 'NewCouponScreen',
  RestaurantDetails: 'RestaurantDetails',
  Restaurants: 'Restaurants',
  Schedule: 'Schedule',
  ServiceDetails: 'ServiceDetails',
  Settings: 'Settings',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  AppliedScreen: 'AppliedScreen',
  Wizard: 'Wizard',
  YourScheduleDetailsScreen: 'YourScheduleDetailsScreen',
  YourScheduleScreen: 'YourScheduleScreen',
  AuthPersonalDetailsScreen: 'AuthPersonalDetailsScreen',
  AuthGenderScreen: 'AuthGenderScreen',
  AuthDateOfBirthScreen: 'AuthDateOfBirthScreen',
  AuthNationalityScreen: 'AuthNationalityScreen',
  AuthCityScreen: 'AuthCityScreen',
  AuthAgencyScreen: 'AuthAgencyScreen',
  AuthUserTypeScreen: 'AuthUserTypeScreen',
  AuthInterestTopicsScreen: 'AuthInterestTopicsScreen',
  AuthProfilePictureScreen: 'AuthProfilePictureScreen',
  AuthCodeFromFriendScreen: 'AuthCodeFromFriendScreen',
  AuthSocialNetworkScreen: 'AuthSocialNetworkScreen',
  SignUpNew: 'SignUpNew',
  RejectedScreen: 'RejectedScreen',
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
