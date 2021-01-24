import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DEFAULT_SCREEN_NAME, SCREEN_NAMES } from './constants'
import { LoginScreen } from '@screens/Login'
import { HomeScreen } from '@screens/Home'

const Root = createStackNavigator()

export function MainStack(): JSX.Element {
  return (
    <Root.Navigator initialRouteName={DEFAULT_SCREEN_NAME} headerMode="none">
      <Root.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Root.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
    </Root.Navigator>
  )
}
