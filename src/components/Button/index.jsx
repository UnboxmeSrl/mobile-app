import React from 'react'
import styled from 'styled-components/native'

import { BUTTON_HEIGHT, BUTTON_WIDTH } from '@components/Button/constants'
import { COLORS } from '@const'
import { withTheme } from '@services/withTheme'

const ThemedButton = styled.TouchableOpacity`
  justifyContent: center
  alignItems: center
  backgroundColor: ${withTheme(COLORS.light1, COLORS.dark1)}
  borderRadius: 6px
  width: ${BUTTON_WIDTH}px
  height:  ${BUTTON_HEIGHT}px
`

export const Button = ({ children, ...rest }) => {
  return <ThemedButton {...rest}>{children}</ThemedButton>
}
