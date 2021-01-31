import { useContext } from 'react'
import { prop } from 'ramda'
import { ThemeContext } from 'styled-components/native'

const _DARK_THEME = 'darkTheme'

export const useDarkTheme = () => prop(_DARK_THEME, useContext(ThemeContext))

export const useTheme = (lightTheme, darkTheme) => {
  return useDarkTheme() ? darkTheme : darkTheme
}
