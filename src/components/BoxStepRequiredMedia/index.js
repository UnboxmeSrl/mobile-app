import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { ORDER_IN_REVIEW } from '@const/order'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { BoxStepRequiredMediaPresenter } from './BoxStepRequiredMediaPresenter'

export const BoxStepRequiredMedia = ({ navigateToNextStep }) => {
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const inReview = order?.status === ORDER_IN_REVIEW

  const props = {
    inReview,
    onPress: navigateToNextStep,
    order,
  }
  return <BoxStepRequiredMediaPresenter {...props} />
}
