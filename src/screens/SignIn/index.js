import React, { useCallback, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MAIN_NAVIGATOR, MODAL_NAMES } from '@const/navigation'
import { reset } from '@services'

import { SignInPresenter } from './SignInPresenter'

export const SignInScreen = () => {
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()

  const navigateToEmailModal = () => {
    navigate(MODAL_NAMES.SignInEmail)
  }
  const navigateToPhoneModal = () => {
    navigate(MODAL_NAMES.SignUpPhone)
  }
  const onSuccess = useCallback(() => {
    reset(MAIN_NAVIGATOR)
  }, [])

  const props = {
    loading,
    navigateToEmailModal,
    navigateToPhoneModal,
    onSuccess,
    setLoading,
  }
  return <SignInPresenter {...props} />
}
