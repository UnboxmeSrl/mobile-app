import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const SCREEN_NAMES = {
  HOME: 'Home',
  AWARDS: 'Awards',
  SETTINGS: 'Settings',
  LOGIN: 'Login',
}
export const DEFAULT_SCREEN_NAME = SCREEN_NAMES.HOME

export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName

    if (route.name === SCREEN_NAMES.HOME) {
      iconName = focused ? 'person' : 'person-outline'
    } else if (route.name === SCREEN_NAMES.AWARDS) {
      iconName = focused ? 'ios-list-box' : 'ios-list'
    } else {
      iconName = focused ? 'ios-list-box' : 'ios-list'
    }

    return <Ionicons name={iconName} size={size} color={color} />
  },
})

export const tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}
