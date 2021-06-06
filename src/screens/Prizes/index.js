import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { AWARD_TYPE_PRIZE } from '@const/award'
import { MODAL_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import { _awardCategory, _awardPrizeCategory, selectAwardPrizeCategory, setAppData } from '@redux/modules/app'
import { selectPrizeAwardsByCategory, selectPrizeCategoriesIds } from '@redux/modules/awards'
import { selectAllBookings, selectAllPrizeBookings } from '@redux/modules/bookings'

import { PrizesScreenPresenter } from './PrizesScreenPresenter'

export const PrizesScreen = () => {
  const { navigate } = useNavigation()
  const categoriesIds = useSelector(selectPrizeCategoriesIds)
  const category = useSelector(selectAwardPrizeCategory)
  const setCategory = useAction(setAppData)
  const onPress = useCallback((id) => setCategory({ [_awardPrizeCategory]: id }), [setCategory])

  const awards = useSelector(selectPrizeAwardsByCategory(category))
  const bookings = useSelector(selectAllPrizeBookings)

  const navigateToSpecialAwards = () => {
    navigate({
      params: { awards, categoriesIds, onPress, type: AWARD_TYPE_PRIZE },
      routeName: MODAL_NAMES.SpecialAwards,
    })
  }
  const props = {
    awards,
    bookings,
    categoriesIds,
    category,
    navigateToSpecialAwards,
    onPress,
  }

  return <PrizesScreenPresenter {...props} />
}
