import React from 'react'
import { DEFAULT_SCREEN_NAME, STACK_NAMES, SCREEN_NAMES } from './constants'
import { createStackNavigator } from '@react-navigation/stack'
import { TabStack } from './TabStack'
import { LoginScreen } from '@screens/Login'

const Root = createStackNavigator()

export function MainStack(): JSX.Element {
  return (
    <Root.Navigator initialRouteName={DEFAULT_SCREEN_NAME} screenOptions={{
      headerShown: false
    }}>
      <Root.Screen name={STACK_NAMES.TAB_STACK} component={TabStack} />
      <Root.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
    </Root.Navigator>
  )
}
