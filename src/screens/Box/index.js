import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { dec, inc } from 'ramda'

import { MODAL_NAMES, STACK_NAMES } from '@const/navigation'
import { _verificationStatus } from '@redux/modules/auth'
import i18n from '@services/i18n'

import { BoxPresenter } from './BoxPresenter'
import { STEPS } from './constants'

export const BoxModal = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const { navigate, goBack } = useNavigation()
  const verificationStatus = useNavigationParam(_verificationStatus)

  const onFinish = useCallback(() => {
    Alert.alert(
      i18n.t('underApproval'),
      i18n.t('inFewHours'),
      [{ onPress: () => navigate(STACK_NAMES.BottomStack), text: 'OK' }],
      {
        cancelable: false,
      }
    )
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
