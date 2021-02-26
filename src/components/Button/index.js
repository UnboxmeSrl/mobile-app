import React from 'react'
import styled from 'styled-components/native'

import { BUTTON_HEIGHT, BUTTON_WIDTH } from '@components/Button/constants'
import { COLORS } from '@const'
import { withTheme } from '@services/withTheme'

const ThemedButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${withTheme(COLORS.primary, COLORS.dark)};
  border-radius: 6px;
  height:  ${BUTTON_HEIGHT}px;
  justify-content: center;
  width: ${BUTTON_WIDTH}px;
`

export const Button = ({ children, ...rest }) => {
  return <ThemedButton {...rest}>{children}</ThemedButton>
}
