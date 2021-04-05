import React from 'react'

import { BoxStepBrandsPresenter } from './BoxStepBrandsPresenter'

export const BoxStepBrands = ({ navigateToNextStep }) => {
  const props = {
    onPress: navigateToNextStep,
  }
  return <BoxStepBrandsPresenter {...props} />
}
