import React, { useCallback, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MAIN_NAVIGATOR, SCREEN_NAMES } from '@const/navigation'
import { reset } from '@services'

import { SignUpScreenPresenter } from './SignUpScreenPresenter'

export const SignUpScreen = () => {
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()

  const navigateToSignUp = useCallback(() => {
    navigate(SCREEN_NAMES.OtherSignUp)
  }, [navigate])

  const navigateToSignIn = useCallback(() => {
    navigate(SCREEN_NAMES.SignIn)
  }, [navigate])

  const onSuccess = useCallback(() => {
    reset(MAIN_NAVIGATOR)
  }, [])

  const props = {
    loading,
    navigateToSignIn,
    navigateToSignUp,
    onSuccess,
    setLoading,
  }

  return <SignUpScreenPresenter {...props} />
}
