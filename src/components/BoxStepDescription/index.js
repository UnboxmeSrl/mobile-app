import React from 'react'

import { BoxStepDescriptionPresenter } from './BoxStepDescriptionPresenter'

export const BoxStepDescription = ({ navigateToNextStep }) => {
  const props = {
    onPress: navigateToNextStep,
  }
  return <BoxStepDescriptionPresenter {...props} />
}
