import React from 'react'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { BUTTON_HEIGHT } from '@components/Button/constants'
import { Subtitle } from '@components/Text'
import { COLORS } from '@const'

export const Button = ({ children, tKey, tOptions, ...rest }) => {
  return <ThemedButton {...rest}>
    {tKey ? <Text color={COLORS.white} tKey={tKey} tOptions={tOptions}/> : children}
  </ThemedButton>
}


const ThemedButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${propOr(COLORS.primary, 'bgColor')};
  border-radius: 16px;
  height: ${BUTTON_HEIGHT}px;
  justify-content: center;
  margin-bottom: 12px;
  width: 100%;
`

const Text = styled(Subtitle)`
  font-size: 18px;
`
