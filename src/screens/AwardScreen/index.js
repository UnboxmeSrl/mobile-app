import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'
import { selectAwardById } from '@redux/modules/awards'

import { AwardScreenPresenter } from './AwardScreenPresenter'

export const AwardScreen = () => {
  const awardId = useNavigationParam('awardId')
  const award = useSelector(selectAwardById(awardId))
  const { navigate } = useNavigation()
  const navigateToSlots = () => navigate({ params: { awardId }, routeName: MODAL_NAMES.Timeslots })
  const props = { navigateToSlots, ...award }

  return <AwardScreenPresenter {...props} />
}
