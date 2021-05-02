import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES, SCREEN_NAMES, STACK_NAMES } from '@const/navigation'
import { ORDER_CONTENT_PUBLISHED, ORDER_ON_THE_WAY } from '@const/order'
import { useAction } from '@hooks/common'
import { getAddressReference } from '@redux/modules/addresses'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId, updateOrder } from '@redux/modules/orders'

import { ContentApprovedPresenter } from './ContentApproved'

export const ContentApprovedScreen = () => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const { extraProducts } = box
  const order = useSelector(selectOrderByBoxId(boxId))
  const updateOrderAction = useAction(updateOrder)

  const onPress = () => {
    updateOrderAction({
      id: order.id,
      status: ORDER_CONTENT_PUBLISHED,
    }).then(() => {
      navigate(STACK_NAMES.BottomStack)
      navigate({
        params: {
          boxId,
          description: 'We will send you your rating as soon as we check the result!',
          noButton: true,
          title: 'box.thanks',
        },
        routeName: MODAL_NAMES.Congratulations,
      })
    })
  }

  const props = {
    box,
    onPress,
    products: extraProducts,
  }

  return <ContentApprovedPresenter {...props} />
}
