import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { ORDER_IN_REVIEW } from '@const/order'
import { selectBoxById } from '@redux/modules/boxes'
import { selectBrandsByIds } from '@redux/modules/brands'
import { selectCategoriesById } from '@redux/modules/categories'
import { selectOrderByBoxId } from '@redux/modules/orders'
import { selectProductsByIds } from '@redux/modules/products'

import { BoxStepBrandsPresenter } from './BoxStepBrandsPresenter'

export const BoxStepBrands = ({ navigateToNextStep }) => {
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const { extraProducts, categories, brands } = box
  const categoriesData = useSelector(selectCategoriesById(categories))
  const brandsData = useSelector(selectBrandsByIds(brands))
  const products = useSelector(selectProductsByIds(extraProducts))
  const order = useSelector(selectOrderByBoxId(boxId))
  const inReview = order?.status === ORDER_IN_REVIEW

  const props = {
    brandsData,
    categoriesData,
    inReview,
    onPress: navigateToNextStep,
    order,
    products,
  }
  return <BoxStepBrandsPresenter {...props} />
}
