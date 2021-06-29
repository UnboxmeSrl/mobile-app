import React, { useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider as Provider } from 'styled-components/native'

const LIGHT_THEME_SCHEME = 'light'

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const darkTheme = colorScheme !== LIGHT_THEME_SCHEME
  const theme = useMemo(() => ({ darkTheme: false }), [darkTheme])

  return <Provider theme={theme}>{children}</Provider>
}
