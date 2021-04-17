import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectBoxById } from '@redux/modules/boxes'

import { BoxStepDescriptionPresenter } from './BoxStepDescriptionPresenter'

export const BoxStepDescription = ({ navigateToNextStep }) => {
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const props = {
    box,
    onPress: navigateToNextStep,
  }
  return <BoxStepDescriptionPresenter {...props} />
}
