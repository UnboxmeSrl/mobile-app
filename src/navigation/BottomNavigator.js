import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AwardsScreen } from '@screens/Awards'
import { HomeScreen } from '@screens/Home'
import { SettingsScreen } from '@screens/Settings'

import { TabBarComponent, TabBarIcon } from '@components/TabBarIcon'
import { COLORS } from '@const'
import { SCREEN_NAMES } from '@const/navigation'

export default createBottomTabNavigator(
  {
    [SCREEN_NAMES.Home]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon activeIcon={'home'} focused={focused} icon={'home-outline'} />
        ),
      },
      screen: HomeScreen,
    },
    [SCREEN_NAMES.Awards]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon activeIcon={'trophy'} focused={focused} icon={'trophy-outline'} />
        ),
      },
      screen: AwardsScreen,
    },
    [SCREEN_NAMES.Settings]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon activeIcon={'person'} focused={focused} icon={'person-outline'} />
        ),
      },
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: SCREEN_NAMES.Home,
    // tabBarComponent: (props) => (
    //   <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    // ),
    tabBarOptions: {
      activeTintColor: COLORS.secondary,
      inactiveTintColor: COLORS.veryLight04,
      style: {
        backgroundColor: COLORS.black,
        borderRadius: 24,
        borderTopWidth: 0,
        height: 56,
      },
    },
  }
)
