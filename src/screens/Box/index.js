import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { dec, inc } from 'ramda'
import { STACK_NAMES } from '@const/navigation'
import { ORDER_IN_REVIEW } from '@const/order'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import { _verificationStatus, selectUid } from '@redux/modules/auth'
import { getBoxReference } from '@redux/modules/boxes'
import { createOrder, selectOrderByBoxId } from '@redux/modules/orders'
import { getUserReference } from '@redux/modules/users'
import i18n from '@services/i18n'

import { BoxPresenter } from './BoxPresenter'
import { STEPS } from './constants'

export const BoxModal = () => {
  const [stepIndex, setStepIndex] = useState(1)
  const { navigate, goBack } = useNavigation()
  const verificationStatus = useNavigationParam(_verificationStatus)
  const createOrderAction = useAction(createOrder)
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))

  const onFinish = useCallback(() => {
    if (!order) {
      createOrderAction({
        box: getBoxReference(boxId),
        status: ORDER_IN_REVIEW,
        user: '',
      })
      Alert.alert(
        i18n.t('underApproval'),
        i18n.t('inFewHours'),
        [{ onPress: () => navigate(STACK_NAMES.BottomStack), text: 'OK' }],
        {
          cancelable: false,
        }
      )
    }
  }, [navigate, order])

  const onFinishCreate = useAuthenticatedAction(onFinish)

  const navigateToNextStep = () => {
    if (stepIndex === STEPS.length) {
      onFinishCreate()
    } else {
      setStepIndex((prevIndex) => Math.min(STEPS.length, inc(prevIndex)))
    }
  }
  const navigateToPrevStep = () => {
    if (order) {
      setStepIndex(1)
    }
    if (stepIndex === 1) {
      goBack()
    } else {
      setStepIndex((prevIndex) => Math.max(1, dec(prevIndex)))
    }
  }
  const navigateToStep = (step) => {
    if (step >= 1 && step <= STEPS.length) {
      setStepIndex(step)
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
    navigateToStep,
    order,
    stepIndex,
    steps: STEPS,
  }
  return <BoxPresenter {...props} />
}
