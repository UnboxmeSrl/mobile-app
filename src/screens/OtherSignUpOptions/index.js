import React, { useCallback, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MAIN_NAVIGATOR, MODAL_NAMES } from '@const/navigation'
import { reset } from '@services'

import { OtherSignUpOptionsPresenter } from './OtherSignUpOptionsPresenter'

export const OtherSingUpOptionsScreen = () => {
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()

  const navigateToEmailModal = () => {
    navigate(MODAL_NAMES.SignUpEmail)
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
  return <OtherSignUpOptionsPresenter {...props} />
}
