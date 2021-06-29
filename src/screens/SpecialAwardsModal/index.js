import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { AWARD_TYPE_PRIZE } from '@const/award'
import { selectAwardCouponCategory, selectAwardPrizeCategory } from '@redux/modules/app'
import {
  selectCouponAwardsByCategory,
  selectCouponCategoriesIds,
  selectPrizeAwardsByCategory,
  selectPrizeCategoriesIds,
} from '@redux/modules/awards'

import { SpecialAwardsPresenter } from './SpecialAwardsPresenter'

export const SpecialAwardsModal = () => {
  const type = useNavigationParam('type')
  const onPress = useNavigationParam('onPress')
  const categoryPrize = useSelector(selectAwardPrizeCategory)
  const categoryCoupon = useSelector(selectAwardCouponCategory)
  const categoriesIdsPrize = useSelector(selectPrizeCategoriesIds)
  const categoriesIdsCoupon = useSelector(selectCouponCategoriesIds)
  const category = type === AWARD_TYPE_PRIZE ? categoryPrize : categoryCoupon

  const categoriesIds = type === AWARD_TYPE_PRIZE ? categoriesIdsPrize : categoriesIdsCoupon
  const awardsPrize = useSelector(selectPrizeAwardsByCategory(category))
  const awardsCoupon = useSelector(selectCouponAwardsByCategory(category))
  const awards = type === AWARD_TYPE_PRIZE ? awardsPrize : awardsCoupon

  const props = { awards, categoriesIds, category, onPress }
  return <SpecialAwardsPresenter {...props} />
}
