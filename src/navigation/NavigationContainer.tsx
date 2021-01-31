import React, { useMemo } from 'react'
import {
  NavigationContainer as NavContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { useDarkTheme } from '@hooks/useTheme'
import { navigationRef } from '@nav/RootNavigator'
import styled from 'styled-components/native'
import { propOr } from 'ramda'

const Wrapper = styled.View`
  flex: 1
  backgroundColor: ${propOr('rgb(0,0,0)', 'bgColor')}
`

export const NavigationContainer = ({ children }) => {
  const isDarkTheme = useDarkTheme()
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : DarkTheme), [
    isDarkTheme,
  ])

  return (
    <Wrapper bgColor={theme.colors.background}>
      <NavContainer ref={navigationRef} theme={theme}>
        {children}
      </NavContainer>
    </Wrapper>
  )
}
