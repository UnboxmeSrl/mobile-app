import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'
import { selectAwardCategory } from '@redux/modules/app'
import { selectAwards, selectAwardsByCategory } from '@redux/modules/awards'
import { selectAllBookings, selectBookings } from '@redux/modules/bookings'

import { PrizesScreenPresenter } from './PrizesScreenPresenter'

export const PrizesScreen = () => {
  const { navigate } = useNavigation()
  const category = useSelector(selectAwardCategory)
  const awards = useSelector(selectAwardsByCategory(category))
  const bookings = useSelector(selectAllBookings)

  const navigateToSpecialAwards = () => {
    navigate(MODAL_NAMES.SpecialAwards)
  }
  const props = { awards, bookings, navigateToSpecialAwards }

  return <PrizesScreenPresenter {...props} />
}
