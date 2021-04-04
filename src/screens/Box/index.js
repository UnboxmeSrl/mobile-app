import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { dec, inc } from 'ramda'

import { MODAL_NAMES, STACK_NAMES } from '@const/navigation'
import { _verificationStatus } from '@redux/modules/auth'

import { BoxPresenter } from './BoxPresenter'
import { STEPS } from './constants'

export const BoxModal = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const { navigate, goBack } = useNavigation()
  const verificationStatus = useNavigationParam(_verificationStatus)

  const onFinish = useCallback(() => {
    navigate(STACK_NAMES.BottomStack)
    navigate(MODAL_NAMES.QuestionnaireThankYou)
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
  const hiddenArrow = stepIndex === 1

  useEffect(() => {
    if (verificationStatus) {
      setStepIndex(STEPS.length)
    }
  }, [])

  const props = {
    hiddenArrow,
    navigateToNextStep,
    navigateToPrevStep,
    stepIndex,
    steps: STEPS,
  }
  return <BoxPresenter {...props} />
}
