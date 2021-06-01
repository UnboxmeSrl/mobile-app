import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectAwardById } from '@redux/modules/awards'

import { TimeslotsPresenter } from './TimeslotsPresenter'

export const TimeslotsModal = () => {
  const awardId = useNavigationParam('awardId')
  const award = useSelector(selectAwardById(awardId))
  const props = { timeslots: award.timeslots }

  return <TimeslotsPresenter {...props} />
}
