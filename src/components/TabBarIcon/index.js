import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SCREEN_NAMES } from '@const/navigation'

export const TabBarIcon =  ({ focused, color, size }) => {
  let iconName
  if (route.name === SCREEN_NAMES.Home) {
    iconName = focused ? 'home' : 'home-outline'
  } else if (route.name === SCREEN_NAMES.Awards) {
    iconName = focused ? 'trophy' : 'trophy-outline'
  } else {
    iconName = focused ? 'person' : 'person-outline'
  }

  return <Ionicons color={color} name={iconName} size={size} />
}
