import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}
