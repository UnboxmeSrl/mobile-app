import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { ORDER_IN_REVIEW } from '@const/order'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { BoxStepHowItWorksPresenter } from './BoxStepHowItWorksPresenter'

export const BoxStepHowItWorks = ({ navigateToNextStep }) => {
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const inReview = order?.status === ORDER_IN_REVIEW

  const props = {
    inReview,
    onPress: navigateToNextStep,
    order,
  }
  return <BoxStepHowItWorksPresenter {...props} />
}
