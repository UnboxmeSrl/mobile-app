import React from 'react'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import styled from 'styled-components/native'
import { SOCIAL_LOGIN_WIDTH, SOCIAL_LOGIN_HEIGHT } from '../constants'

interface IProps {
  onPress: () => void
}

const Button = styled(AppleButton).attrs({
  width: SOCIAL_LOGIN_WIDTH,
  height: SOCIAL_LOGIN_HEIGHT,
})`
  margin-bottom: 10px;
`

export const AppleLoginPresenter: any = ({ onPress }: IProps) => (
  <Button
    buttonStyle={AppleButton.Style.WHITE}
    buttonType={AppleButton.Type.SIGN_IN}
    onPress={onPress}
  />
)
