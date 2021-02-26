import React from 'react'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Subtitle } from '@components/Text'
import { COLORS } from '@const'

import { SOCIAL_LOGIN_HEIGHT } from '../constants'

export const LoginButton = ({ onPress, name, bgColor }) => {
  return (
    <StyledButton bgColor={bgColor} onPress={onPress} >
      <Text color={COLORS.white} tKey={'login.continueWith'} tOptions={{ name }}/>
    </StyledButton>
  )
}

export const OtherOptionsButton = ({ onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <Text color={COLORS.white} tKey={'login.otherOptions'}/>
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  background-color: ${propOr(COLORS.primary, 'bgColor')};
  border-radius: 16px;
  height: ${SOCIAL_LOGIN_HEIGHT}px;
  margin-bottom: 12px;
  width: 100%;
`
const Text = styled(Subtitle)`
  font-size: 18px;
`
