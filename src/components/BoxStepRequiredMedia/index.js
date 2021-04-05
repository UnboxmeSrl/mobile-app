import React from 'react'

import { BoxStepRequiredMediaPresenter } from './BoxStepRequiredMediaPresenter'

export const BoxStepRequiredMedia = ({ navigateToNextStep }) => {
  const props = {
    onPress: navigateToNextStep,
  }
  return <BoxStepRequiredMediaPresenter {...props} />
}
