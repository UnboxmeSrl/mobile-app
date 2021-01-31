import React from 'react'
import {
  SCREEN_NAMES,
  screenOptions,
  tabBarOptions,
} from './constants'
import {HomeScreen} from '@screens/Home'
import { AwardsScreen } from '@screens/Awards'
import { SettingsScreen } from '@screens/Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

export function TabStack(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.HOME}
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAMES.AWARDS} component={AwardsScreen} />
      <Tab.Screen name={SCREEN_NAMES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  )
}
