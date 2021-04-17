import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectBoxById } from '@redux/modules/boxes'
import { selectBrandsByIds } from '@redux/modules/brands'
import { selectCategoriesById } from '@redux/modules/categories'
import { selectProductsByIds } from '@redux/modules/products'

import { BoxStepBrandsPresenter } from './BoxStepBrandsPresenter'

export const BoxStepBrands = ({ navigateToNextStep }) => {
  const boxId = useNavigationParam('boxId')
  const box = useSelector(selectBoxById(boxId))
  const { extraProducts, categories, brands } = box
  const categoriesData = useSelector(selectCategoriesById(categories))
  const brandsData = useSelector(selectBrandsByIds(brands))
  const products = useSelector(selectProductsByIds(extraProducts))

  const props = {
    brandsData,
    categoriesData,
    onPress: navigateToNextStep,
    products,
  }
  return <BoxStepBrandsPresenter {...props} />
}
