import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MODAL_NAMES } from '@const/navigation'

import { PrizesScreenPresenter } from './PrizesScreenPresenter'

export const PrizesScreen = () => {
  const { navigate } = useNavigation()
  const navigateToSpecialAwards = () => {
    navigate(MODAL_NAMES.SpecialAwards)
  }
  const props = { navigateToSpecialAwards }

  return <PrizesScreenPresenter {...props} />
}
