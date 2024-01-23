import React from 'react'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '@const'

export const TabBarIcon = ({ focused, icon }) => {
  // const iconName = focused ? activeIcon : icon
  const color = focused ? COLORS.lightTaupe : COLORS.gray

  // return <Ionicons color={color} name={iconName} size={24} />

  return <Image resizeMode="contain" source={icon} style={{ height: 24, tintColor: color, width: 24 }} />
}
