import React, { useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectBrandById, selectBrandsByIds } from '@redux/modules/brands'
import { selectCategoryById } from '@redux/modules/categories'
import { selectProductById } from '@redux/modules/products'

import { ProductTilePresenter } from './ProductTilePresenter'

export const ProductTile = ({ product, selected, onPress }) => {
  const { navigate } = useNavigation()
  const data = useSelector(selectProductById(product))
  const category = useSelector(selectCategoryById(data.category))
  const brand = useSelector(selectBrandById(data.brand))
  const props = { ...data, brand, category, onPress, selected }

  return <ProductTilePresenter {...props} />
}
