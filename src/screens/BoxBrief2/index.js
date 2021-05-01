import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'

import { BoxBrief2Presenter } from './BoxBrief2'

export const BoxBrief2Screen = () => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const { extraProducts } = box

  const onPress = () => {
    navigate({
      params: { boxId },
      routeName: SCREEN_NAMES.BoxContentUploadScreen,
    })
  }

  const props = {
    box,
    onPress,
    products: extraProducts,
  }

  return <BoxBrief2Presenter {...props} />
}
