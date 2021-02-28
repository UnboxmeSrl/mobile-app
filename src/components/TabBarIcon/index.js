import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '@const'

export const TabBarIcon = ({ focused, icon, activeIcon }) => {
  const iconName = focused ? activeIcon : icon
  const color = focused ? COLORS.secondary : COLORS.veryLight04

  return <Ionicons color={color} name={iconName} size={24} />
}
