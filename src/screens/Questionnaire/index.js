import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { STEPS } from '@screens/Wizard/constants'
import { dec, inc } from 'ramda'

import { STACK_NAMES } from '@const/navigation'
import { _verificationStatus } from '@redux/modules/auth'

import { QuestionnairePresenter } from './QuestionnairePresenter'

export const QuestionnaireScreen = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const { navigate, goBack } = useNavigation()
  const verificationStatus = useNavigationParam(_verificationStatus)

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
  const hiddenArrow = stepIndex === 1 && true

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
  return <QuestionnairePresenter {...props} />
}
