import { prop } from 'ramda'
import { useContext } from 'react'
import type { StyledInterface } from 'styled-components'
import { ThemeContext } from 'styled-components/native'

const _DARK_THEME = 'darkTheme'

export const useDarkTheme = (): boolean =>
  prop(_DARK_THEME, useContext(ThemeContext))

export const useTheme = (
  lightTheme: StyledInterface,
  darkTheme: StyledInterface,
): StyledInterface => {
  return useDarkTheme() ? darkTheme : lightTheme
}
