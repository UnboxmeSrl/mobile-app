import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { BoxContentUploadPresenter } from './BoxContentUploadPresenter'

export const BoxContentUploadScreen = () => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const box = useSelector(selectBoxById(boxId))
  const { extraProducts } = box

  const onPress = () => {}

  const props = {
    box,
    onPress,
    order,
    products: extraProducts,
  }

  return <BoxContentUploadPresenter {...props} />
}
