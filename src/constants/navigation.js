import { COLORS } from '@const'

export const STACK_NAMES = {
  BottomStack: 'BottomStack'
}
export const MODAL_NAMES = {
  Login: 'Login',
}
export const SCREEN_NAMES = {
  Awards: 'Awards',
  Home: 'Home',
  Onboarding: 'Onboarding',
  Settings: 'Settings',
  SignUp: 'SignUp'
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
