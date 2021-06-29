import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { PrizesScreenPresenter } from '@screens/Prizes/PrizesScreenPresenter'

import { AWARD_TYPE_COUPON, AWARD_TYPE_PRIZE } from '@const/award'
import { MODAL_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import { _awardCouponCategory, selectAwardCouponCategory, setAppData } from '@redux/modules/app'
import { selectCouponAwardsByCategory, selectCouponCategoriesIds } from '@redux/modules/awards'
import { selectAllBookings, selectAllCouponBookings } from '@redux/modules/bookings'

export const CouponsScreen = () => {
  const { navigate } = useNavigation()
  const categoriesIds = useSelector(selectCouponCategoriesIds)
  const category = useSelector(selectAwardCouponCategory)
  const setCategory = useAction(setAppData)
  const onPress = useCallback((id) => setCategory({ [_awardCouponCategory]: id }), [setCategory])

  const awards = useSelector(selectCouponAwardsByCategory(category))
  const bookings = useSelector(selectAllCouponBookings)

  const navigateToSpecialAwards = () => {
    navigate({
      params: { onPress, type: AWARD_TYPE_COUPON },
      routeName: MODAL_NAMES.SpecialAwards,
    })
  }
  const props = {
    awards,
    bookings,
    categoriesIds,
    category,
    isPrize: false,
    navigateToSpecialAwards,
    onPress,
    title: 'awards.specialCoupons',
  }

  return <PrizesScreenPresenter {...props} />
}
