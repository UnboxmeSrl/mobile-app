import React, { useCallback, useMemo } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'
import { ORDER_APPROVED, ORDER_IN_REVIEW, ORDER_REJECTED } from '@const/order'
import { selectHasQuestionnaire } from '@redux/modules/auth'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { BoxStepDescriptionPresenter } from './BoxStepDescriptionPresenter'

export const BoxStepDescription = ({ navigateToNextStep, navigateToStep }) => {
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const order = useSelector(selectOrderByBoxId(boxId))
  const hasQuestionnaire = useSelector(selectHasQuestionnaire)
  const inReview = order?.status === ORDER_IN_REVIEW
  const approved = order?.status === ORDER_APPROVED
  const rejected = order?.status === ORDER_REJECTED
  const navigateToQuestionnaire = () => navigate(MODAL_NAMES.FillQuestionnaire)
  const { navigate } = useNavigation()

  const navigateToBrands = () => navigateToStep(2)
  const navigateToHowItWorks = () => navigateToStep(3)
  const navigateToRequiredMedia = () => navigateToStep(4)

  const onPress = useCallback(() => {
    if (order) {
      if (approved) {
        const fn = hasQuestionnaire ? () => null : navigateToQuestionnaire
        fn()
      } else if (rejected) {
        // TODO
      }
    } else {
      navigateToNextStep()
    }
  }, [order, approved, hasQuestionnaire, navigateToNextStep])

  const tKey = useMemo(() => {
    if (order) {
      if (approved) {
        if (hasQuestionnaire) {
          return 'box.chooseExtra'
        } else {
          return 'questionnaire.fill'
        }
      } else {
        return 'contactUs'
      }
    } else {
      return 'next'
    }
  }, [order, approved, rejected, hasQuestionnaire])

  const props = {
    approved,
    box,
    hasQuestionnaire,
    inReview,
    navigateToBrands,
    navigateToHowItWorks,
    navigateToRequiredMedia,
    onPress,
    order,
    tKey,
  }
  return <BoxStepDescriptionPresenter {...props} />
}
