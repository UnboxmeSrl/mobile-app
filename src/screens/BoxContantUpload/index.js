import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { prop, propOr } from 'ramda'
import { MODAL_NAMES, SCREEN_NAMES, STACK_NAMES } from '@const/navigation'
import { ORDER_CONTENT_IN_REVIEW, ORDER_ON_THE_WAY } from '@const/order'
import { useAction } from '@hooks/common'
import { getAddressReference } from '@redux/modules/addresses'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId, updateOrder } from '@redux/modules/orders'

import { BoxContentUploadPresenter } from './BoxContentUploadPresenter'

export const BoxContentUploadScreen = (callback, deps) => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const updateOrderAction = useAction(updateOrder)
  const box = useSelector(selectBoxById(boxId))
  const [items, setItems] = useState([])
  const { extraProducts } = box

  const onPress = () => {
    const onPress = () =>
      navigate({
        params: { boxId },
        routeName: SCREEN_NAMES.BoxBrief,
      })

    updateOrderAction({
      id: order.id,
      status: ORDER_CONTENT_IN_REVIEW,
    }).then(() => {
      navigate(STACK_NAMES.BottomStack)
      navigate({
        params: {
          boxId,
          button: 'box.checkBrief',
          description: 'box.checkContent',
          onPress,
          title: 'box.great',
        },
        routeName: MODAL_NAMES.Congratulations,
      })
    })
  }
  const fetchFiles = useCallback(async () => {
    const data = []
    setItems(propOr([], 'items', data))
  }, [box, order])
  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])
  const props = {
    box,
    items,
    onPress,
    order,
    products: extraProducts,
  }

  return <BoxContentUploadPresenter {...props} />
}
