import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { MODAL_NAMES } from '@const/navigation'

import { AwardScreenPresenter } from './AwardScreenPresenter'

export const AwardScreen = () => {
  const { navigate } = useNavigation()
  const navigateToSlots = () => navigate(MODAL_NAMES.Timeslots)
  const props = { navigateToSlots }

  return <AwardScreenPresenter {...props} />
}
