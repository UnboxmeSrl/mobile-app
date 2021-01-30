import React from 'react'
import {
  DEFAULT_SCREEN_NAME,
  SCREEN_NAMES,
  screenOptions,
  tabBarOptions,
} from './constants'
import { LoginScreen } from '@screens/Login'
import { HomeScreen } from '@screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

export function MainStack(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={DEFAULT_SCREEN_NAME}
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAMES.AWARDS} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAMES.SETTINGS} component={LoginScreen} />
    </Tab.Navigator>
  )
}
