import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'
import { selectAwards } from '@redux/modules/awards'

import { PrizesScreenPresenter } from './PrizesScreenPresenter'

export const PrizesScreen = () => {
  const { navigate } = useNavigation()
  const awards = useSelector(selectAwards)

  const navigateToSpecialAwards = () => {
    navigate(MODAL_NAMES.SpecialAwards)
  }
  const props = { awards, navigateToSpecialAwards }

  return <PrizesScreenPresenter {...props} />
}
