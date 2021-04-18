import React, { useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId, updateOrder } from '@redux/modules/orders'
import { getProductReference } from '@redux/modules/products'

import { ProductSelectionPresenter } from './ProductSelectionPresenter'

export const ProductSelectionScreen = () => {
  const { navigate } = useNavigation()

  const boxId = useNavigationParam('boxId')
  const [selected, setSelected] = useState(null)
  const box = useSelector(selectBoxById(boxId))
  const updateOrderAction = useAction(updateOrder)
  const order = useSelector(selectOrderByBoxId(boxId))
  const { extraProducts } = box

  const onConfirm = () => {
    if (order) {
      updateOrderAction({ extraProduct: getProductReference(selected), id: order.id }).then(() => {
        navigate({ routeName: SCREEN_NAMES.AddNewAddress })
      })
    }
  }

  useEffect(() => {
    setSelected(order.extraProduct)
  }, [setSelected, order.extraProduct])
  const props = {
    onConfirm,
    products: extraProducts,
    selected,
    setSelected,
  }

  return <ProductSelectionPresenter {...props} />
}
