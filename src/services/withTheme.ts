// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StyledProps } from 'styled-components'

export const withTheme = (
  lightThemeValue: StyledProps<any>,
  darkThemeValue: StyledProps<any>,
): StyledProps<any> => ({
  theme: { darkTheme },
}: {
  theme: { darkTheme: boolean }
}) => (darkTheme ? darkThemeValue : lightThemeValue)
