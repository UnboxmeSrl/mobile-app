import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {COLORS} from "@const";

export const STACK_NAMES = {
  TAB_STACK: 'Tabs',
}
export const SCREEN_NAMES = {
  HOME: 'Home',
  AWARDS: 'Awards',
  SETTINGS: 'Settings',
  LOGIN: 'Login',
}
export const DEFAULT_SCREEN_NAME = STACK_NAMES.TAB_STACK

export const COMMON_STATUS_BAR = {
  translucent: true,
  backgroundColor: 'transparent',
}

export const LIGHT_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'light-content',
}

export const DARK_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'dark-content',
}


export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName

    if (route.name === SCREEN_NAMES.HOME) {
      iconName = focused ? 'home' : 'home-outline'
    } else if (route.name === SCREEN_NAMES.AWARDS) {
      iconName = focused ? 'trophy' : 'trophy-outline'
    } else {
      iconName = focused ? 'person' : 'person-outline'
    }

    return <Ionicons name={iconName} size={size} color={color} />
  }
})

export const tabBarOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: 'gray',
}
