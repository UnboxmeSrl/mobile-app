import React from 'react'
import { LoginButton } from 'react-native-fbsdk'
import styled from 'styled-components/native'
import { SOCIAL_LOGIN_HEIGHT, SOCIAL_LOGIN_WIDTH } from '../constants'

interface IProps {
  onLoginFinished: () => void
}

const Button = styled(LoginButton)`
  width: ${SOCIAL_LOGIN_WIDTH}
  height: ${SOCIAL_LOGIN_HEIGHT}px
  justifyContent: center
  alignItems: center
`

export const FacebookLoginPresenter: any = ({ onLoginFinished }: IProps) => (
  <Button onLoginFinished={onLoginFinished} />
)
