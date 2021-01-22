import React from 'react'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import styled from 'styled-components/native'
import { SOCIAL_LOGIN_HEIGHT, SOCIAL_LOGIN_WIDTH } from '../constants'

interface IProps {
  onPress: () => void
  isSigninInProgress: boolean
}

const Button = styled(GoogleSigninButton)`
  width: ${SOCIAL_LOGIN_WIDTH}
  height: ${SOCIAL_LOGIN_HEIGHT}px
`

export const GoogleLoginPresenter: any = ({
  onPress,
  isSigninInProgress,
}: IProps) => <Button onPress={onPress} disabled={isSigninInProgress} />
