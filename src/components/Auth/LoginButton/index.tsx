import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { SemiBoldText } from '@components/Text'

import { SOCIAL_LOGIN_HEIGHT, SOCIAL_LOGIN_WIDTH } from '../constants'

interface IProps {
  onPress: () => void
}

const StyledButton = styled(Button)`
  width: ${SOCIAL_LOGIN_WIDTH}
  height: ${SOCIAL_LOGIN_HEIGHT}px
  marginBottom: 8px
`

export const LoginButton: any = ({ onPress, name }: IProps) => {
  return (
    <StyledButton onPress={onPress}>
      <SemiBoldText tKey={'login.continueWith'} tOptions={{ name }} />
    </StyledButton>
  )
}
