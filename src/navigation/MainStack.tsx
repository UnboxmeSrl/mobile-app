import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DEFAULT_SCREEN_NAME, SCREEN_NAMES } from './constants'
import { LoginScreen } from '../screens/Login'

const Root = createStackNavigator()

export function MainStack (): JSX.Element {
  return (
    <Root.Navigator initialRouteName={DEFAULT_SCREEN_NAME} headerMode="screen">
      <Root.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
    </Root.Navigator>
  )
}
