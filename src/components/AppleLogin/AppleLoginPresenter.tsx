import React from 'react'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import styled from 'styled-components/native'

interface IProps {
  onPress: () => void
}
const Button = styled(AppleButton).attrs({
  width: '90%',
  height: 50,
})``

export const AppleLoginPresenter: any = ({ onPress }: IProps) => (
  <Button
    buttonStyle={AppleButton.Style.WHITE}
    buttonType={AppleButton.Type.SIGN_IN}
    onPress={onPress}
  />
)
