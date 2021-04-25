import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES, SCREEN_NAMES, STACK_NAMES } from '@const/navigation'
import { ORDER_ON_THE_WAY } from '@const/order'
import { useAction } from '@hooks/common'
import { getAddressReference, selectHasAnyAddress } from '@redux/modules/addresses'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId, updateOrder } from '@redux/modules/orders'
import { getProductReference } from '@redux/modules/products'

import { ProductSelectionPresenter } from './ProductSelectionPresenter'

export const ProductSelectionScreen = () => {
  const { navigate } = useNavigation()

  const boxId = useNavigationParam('boxId')
  const hasAnyAddress = useSelector(selectHasAnyAddress)
  const [selected, setSelected] = useState(null)
  const box = useSelector(selectBoxById(boxId))
  const updateOrderAction = useAction(updateOrder)
  const order = useSelector(selectOrderByBoxId(boxId))
  const { extraProducts } = box

  const onAddressSelectConfirm = useCallback(
    (address) => {
      if (order) {
        updateOrderAction({
          address: getAddressReference(address.id),
          addressRaw: address,
          id: order.id,
          status: ORDER_ON_THE_WAY,
        }).then(() => {
          navigate(STACK_NAMES.BottomStack)
          navigate({ params: { boxId }, routeName: MODAL_NAMES.Congratulations })
        })
      }
    },
    [order, updateOrderAction, navigate]
  )

  const onSelectConfirm = useCallback(() => {
    if (order) {
      updateOrderAction({ extraProduct: getProductReference(selected), id: order.id }).then(() => {
        if (hasAnyAddress) {
          navigate({
            params: { onConfirm: onAddressSelectConfirm, withSelection: true },
            routeName: SCREEN_NAMES.Addresses,
          })
        } else {
          navigate({ routeName: SCREEN_NAMES.AddNewAddress })
        }
      })
    }
  }, [order, selected, updateOrderAction, navigate, hasAnyAddress, onAddressSelectConfirm])

  useEffect(() => {
    setSelected(order.extraProduct)
  }, [setSelected, order.extraProduct])
  const props = {
    onConfirm: onSelectConfirm,
    products: extraProducts,
    selected,
    setSelected,
  }

  return <ProductSelectionPresenter {...props} />
}
