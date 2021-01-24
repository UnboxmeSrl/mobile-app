import React, { useMemo } from 'react'
import {
  NavigationContainer as NavContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { useDarkTheme } from '@hooks/useTheme'
import { navigationRef } from '@nav/RootNavigator'

enableScreens()

export const NavigationContainer = ({ children }) => {
  const isDarkTheme = useDarkTheme()
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : DefaultTheme), [
    isDarkTheme,
  ])

  return (
    <NavContainer ref={navigationRef} theme={theme}>
      {children}
    </NavContainer>
  )
}
