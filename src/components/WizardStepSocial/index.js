import React from 'react'

import { WizardStepSocialPresenter } from './WizardStepSocialPresenter'

export const WizardStepSocial = ({ navigateToNextStep }) => {
  const onPress = () => {
    navigateToNextStep()
  }

  const props = {
    onPress,
  }
  return <WizardStepSocialPresenter {...props} />
}
