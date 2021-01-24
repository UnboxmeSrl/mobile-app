import React from 'react'
import styled from 'styled-components/native'
import { withTheme } from '@services/withTheme'
import { COLORS } from '@const'
import { BUTTON_HEIGHT, BUTTON_WIDTH } from '@components/Button/constants'

const ThemedButton = styled.TouchableOpacity`
  justifyContent: center
  alignItems: center
  backgroundColor: ${withTheme(COLORS.darkBg1, COLORS.light1)}
  borderRadius: 6
  width: ${BUTTON_WIDTH}px
  height:  ${BUTTON_HEIGHT}px
`

export const Button = ({ children, ...rest }) => {
  return <ThemedButton {...rest}>{children}</ThemedButton>
}
