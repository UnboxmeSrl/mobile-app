import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MODAL_NAMES } from '@const/navigation'

import { OtherSignUpOptionsPresenter } from './OtherSignUpOptionsPresenter'

export const OtherSingUpOptionsScreen = () => {
  const { navigate } = useNavigation()
  const navigateToEmailModal = () => {
    navigate(MODAL_NAMES.SignUpEmail)
  }
  const navigateToPhoneModal = () => {
    navigate(MODAL_NAMES.SignUpPhone)
  }
  const props = {
    navigateToEmailModal,
    navigateToPhoneModal
  }
  return <OtherSignUpOptionsPresenter {...props}/>
}
