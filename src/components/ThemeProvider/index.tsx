import React, { useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider as Provider } from 'styled-components/native'

import { IReactChildren } from '@types'

const LIGHT_THEME_SCHEME = 'light'

export const ThemeProvider: IReactChildren = ({ children }) => {
  const colorScheme = useColorScheme()
  const darkTheme = colorScheme !== LIGHT_THEME_SCHEME
  const theme = useMemo(() => ({ darkTheme: false }), [darkTheme])

  return <Provider theme={theme}>{children}</Provider>
}
