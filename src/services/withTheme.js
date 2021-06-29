export const withTheme = (lightThemeValue, darkThemeValue) => ({
  theme: { darkTheme },
}) => (darkTheme ? darkThemeValue : lightThemeValue)
