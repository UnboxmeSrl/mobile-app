import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MODAL_NAMES } from '@const/navigation'

import { WizardStepSocialPresenter } from './WizardStepSocialPresenter'

export const WizardStepSocial = ({ navigateToNextStep }) => {
  const { navigate } = useNavigation()
  const onPress = () => {
    navigateToNextStep()
  }

  const navigateTikTokModal = () => {
    navigate(MODAL_NAMES.Tiktok)
  }

  const props = {
    navigateTikTokModal,
    onPress,
  }
  return <WizardStepSocialPresenter {...props} />
}
