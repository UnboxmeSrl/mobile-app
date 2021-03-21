import React, { useCallback, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { STEPS } from '@screens/Wizard/constants'
import { dec, inc } from 'ramda'

import { STACK_NAMES } from '@const/navigation'

import { WizardPresenter } from './WizardPresenter'

export const WizardScreen = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const { navigate, goBack } = useNavigation()

  const onFinish = useCallback(() => {
    navigate(STACK_NAMES.BottomStack)
  }, [navigate])

  const navigateToNextStep = () => {
    if (stepIndex === STEPS.length) {
      onFinish()
    } else {
      setStepIndex((prevIndex) => Math.min(STEPS.length, inc(prevIndex)))
    }
  }
  const navigateToPrevStep = () => {
    if (stepIndex === 1) {
      goBack()
    } else {
      setStepIndex((prevIndex) => Math.max(1, dec(prevIndex)))
    }
  }

  const props = {
    navigateToNextStep,
    navigateToPrevStep,
    stepIndex,
    steps: STEPS,
  }
  return <WizardPresenter {...props} />
}
