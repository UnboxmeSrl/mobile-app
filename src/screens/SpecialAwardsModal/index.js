import React from 'react'
import { useSelector } from 'react-redux'

import { selectAwardCategory } from '@redux/modules/app'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { selectAwards, selectAwardsByCategory } from '@redux/modules/awards'

import { SpecialAwardsPresenter } from './SpecialAwardsPresenter'

export const SpecialAwardsModal = () => {
  const category = useSelector(selectAwardCategory)
  const awards = useSelector(selectAwardsByCategory(category))
  console.log({ awards })
  return <SpecialAwardsPresenter awards={awards} />
}
