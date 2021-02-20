interface ITheme {
  theme: {
    darkTheme: boolean
  }
}

export type WithThemeType = (
  lightThemeValue: string | number,
  darkThemeValue: string | number,
) => (data: ITheme) => string | number

export const withTheme: WithThemeType = (lightThemeValue, darkThemeValue) => ({
  theme: { darkTheme },
}) => (darkTheme ? darkThemeValue : lightThemeValue)
