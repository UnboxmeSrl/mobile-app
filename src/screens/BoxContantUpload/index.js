import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { prop, propOr } from 'ramda'

import { contentRef, getContentDir } from '@const/firebase'
import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { BoxContentUploadPresenter } from './BoxContentUploadPresenter'

export const BoxContentUploadScreen = (callback, deps) => {
  const { navigate } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const box = useSelector(selectBoxById(boxId))
  const [items, setItems] = useState([])
  const { extraProducts } = box

  const onPress = () => {}
  const fetchFiles = useCallback(async () => {
    const data = await contentRef.ref(getContentDir(box, order)).list()
    setItems(propOr([], 'items', data))
  }, [box, order])
  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])
  console.log(items)
  const props = {
    box,
    items,
    onPress,
    order,
    products: extraProducts,
  }

  return <BoxContentUploadPresenter {...props} />
}
