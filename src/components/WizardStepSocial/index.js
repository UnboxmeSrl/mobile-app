import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'
import { selectInstagramUsername, selectTiktokUsername } from '@redux/modules/auth'

import { WizardStepSocialPresenter } from './WizardStepSocialPresenter'

export const WizardStepSocial = ({ navigateToNextStep }) => {
  const tiktokUsername = useSelector(selectTiktokUsername)
  const instagramUsername = useSelector(selectInstagramUsername)

  const { navigate } = useNavigation()
  const onPress = () => {
    navigateToNextStep()
  }

  const navigateTikTokModal = () => {
    navigate(MODAL_NAMES.Tiktok)
  }

  const props = {
    // disabled: !(tiktokUsername || instagramUsername),
    disabled: false,
    navigateTikTokModal,
    onPress,
    tiktokUsername,
  }
  return <WizardStepSocialPresenter {...props} />
}
