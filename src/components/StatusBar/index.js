import React from 'react'
import { StatusBar } from 'react-native'

import { useTheme } from '@hooks/useTheme'
import { DARK_STATUS_BAR, LIGHT_STATUS_BAR } from '@nav/constants'

export const StyledStatusBar = () => {
  const props = useTheme(DARK_STATUS_BAR, LIGHT_STATUS_BAR)

  return <StatusBar {...props} />
}
