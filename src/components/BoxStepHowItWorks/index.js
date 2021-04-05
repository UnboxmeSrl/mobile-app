import React from 'react'

import { BoxStepHowItWorksPresenter } from './BoxStepHowItWorksPresenter'

export const BoxStepHowItWorks = ({ navigateToNextStep }) => {
  const props = {
    onPress: navigateToNextStep,
  }
  return <BoxStepHowItWorksPresenter {...props} />
}
