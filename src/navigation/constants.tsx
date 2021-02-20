import React from 'react'
import { StatusBarProps } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '@const'
import {
  ERouterScreens,
  ERouterStacks,
  RouteName,
  TabScreenOptions,
} from '@types'

export const DEFAULT_SCREEN_NAME: RouteName = ERouterStacks.BottomStack

export const COMMON_STATUS_BAR: StatusBarProps = {
  backgroundColor: 'transparent',
  translucent: true,
}

export const LIGHT_STATUS_BAR: StatusBarProps = {
  ...COMMON_STATUS_BAR,
  barStyle: 'light-content',
}

export const DARK_STATUS_BAR: StatusBarProps = {
  ...COMMON_STATUS_BAR,
  barStyle: 'dark-content',
}


export const screenOptions: TabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName
    if (route.name === ERouterScreens.Home) {
      iconName = focused ? 'home' : 'home-outline'
    } else if (route.name === ERouterScreens.Awards) {
      iconName = focused ? 'trophy' : 'trophy-outline'
    } else {
      iconName = focused ? 'person' : 'person-outline'
    }

    return <Ionicons color={color} name={iconName} size={size} />
  },
})

export const tabBarOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: 'gray',
}
