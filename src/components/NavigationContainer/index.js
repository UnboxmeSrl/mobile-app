import React, { useMemo } from 'react'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer as NavContainer,
} from '@react-navigation/native'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { useDarkTheme } from '@hooks/useTheme'
import { navigationRef } from '@services/navigation'

const Wrapper = styled.View`
  flex: 1
  background-color: ${propOr('rgb(0,0,0)', 'bgColor')}
`

export const NavigationContainer = ({ children }) => {
  const isDarkTheme = useDarkTheme()
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : DefaultTheme), [isDarkTheme])

  return (
    <Wrapper>
      <NavContainer ref={navigationRef} theme={theme}>
        {children}
      </NavContainer>
    </Wrapper>
  )
}
