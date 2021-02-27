import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { SCREEN_NAMES } from '@const/navigation'

import { SignUpScreenPresenter } from './SignUpScreenPresenter'

export const SignUpScreen = () => {
  const { navigate } = useNavigation()
  const onPress = useCallback(() => {
    navigate(SCREEN_NAMES.OtherSignUp)
  }, [navigate])

  return <SignUpScreenPresenter onPress={onPress}/>
}
