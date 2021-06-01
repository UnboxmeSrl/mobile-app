import React from 'react'
import { useSelector } from 'react-redux'

import { selectIsAuthenticated } from '@redux/modules/auth'
import { selectAwards } from '@redux/modules/awards'

import { SpecialAwardsPresenter } from './SpecialAwardsPresenter'

export const SpecialAwardsModal = () => {
  const awards = useSelector(selectAwards)

  return <SpecialAwardsPresenter awards={awards} />
}
