import {
  DarkTheme, DefaultTheme,
  NavigationContainer as NavContainer,
} from '@react-navigation/native'
import { propOr } from 'ramda'
import React, { useMemo } from 'react'
import styled from 'styled-components/native'

import { useDarkTheme } from '@hooks/useTheme'
import { navigationRef } from '@services/navigation'
import { IReactChildren } from '@types'

const Wrapper = styled.View`
  flex: 1
  backgroundColor: ${propOr('rgb(0,0,0)', 'bgColor')}
`

export const NavigationContainer: IReactChildren = ({ children }) => {
  const isDarkTheme = useDarkTheme()
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : DefaultTheme), [
    isDarkTheme,
  ])

  return (
    <Wrapper>
      <NavContainer ref={navigationRef} theme={theme}>
        {children}
      </NavContainer>
    </Wrapper>
  )
}
