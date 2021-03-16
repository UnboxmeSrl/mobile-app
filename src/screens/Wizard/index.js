import React, { useState } from 'react'
import { STEPS } from '@screens/Wizard/constants'
import { dec, inc } from 'ramda'

import { WizardPresenter } from './WizardPresenter'

export const WizardScreen = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const navigateToNextStep = () =>
    setStepIndex((prevIndex) => Math.min(STEPS.length, inc(prevIndex)))
  const navigateToPrevStep = () =>
    setStepIndex((prevIndex) => Math.max(1, dec(prevIndex)))

  const props = {
    navigateToNextStep,
    navigateToPrevStep,
    stepIndex,
    steps: STEPS,
  }
  return <WizardPresenter {...props} />
}
