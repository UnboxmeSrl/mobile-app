import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'

import { CongratulationsPresenter } from './CongratulationsPresenter'

export const CongratulationsModal = () => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const noButton = useNavigationParam('noButton')
  const button = useNavigationParam('button')
  const description = useNavigationParam('description')
  const onPress = useNavigationParam('onPress')
  const title = useNavigationParam('title')
  const box = useSelector(selectBoxById(boxId))

  const onButtonPress = () => {
    onPress && onPress()
  }

  const props = {
    box,
    button,
    description,
    noButton,
    onButtonPress,
    title,
  }

  return <CongratulationsPresenter {...props} />
}
