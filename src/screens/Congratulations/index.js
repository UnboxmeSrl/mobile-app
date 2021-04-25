import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'

import { CongratulationsPresenter } from './CongratulationsPresenter'

export const CongratulationsModal = () => {
  const { navigate } = useNavigation()
  const navigateTo = () => navigate(SCREEN_NAMES.Questionnaire)
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))

  const props = {
    box,
    navigateTo,
  }

  return <CongratulationsPresenter {...props} />
}
