import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'

import { BoxBriefPresenter } from './BoxBrief'

export const BoxBriefScreen = () => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))

  const onPress = () => {
    navigate({
      params: { boxId },
      routeName: SCREEN_NAMES.BoxBrief2,
    })
  }

  const props = {
    box,
    onPress,
  }

  return <BoxBriefPresenter {...props} />
}
