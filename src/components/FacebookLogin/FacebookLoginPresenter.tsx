import React from 'react'
import { LoginButton } from 'react-native-fbsdk'

interface IProps {
  onLoginFinished: () => void
}

export const FacebookLoginPresenter: any = ({ onLoginFinished }: IProps) => (
  <LoginButton onLoginFinished={onLoginFinished} />
)
