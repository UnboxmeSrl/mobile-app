import React from 'react'
import { useSelector } from 'react-redux'

import { selectSumOfPoints, selectSumOfStars } from '@redux/modules/transactions'

import { PointsPresenter } from './PointsPresenter'

export const Points = ({ value, isPrize = true }) => {
  const userPoints = useSelector(selectSumOfPoints)
  const userStars = useSelector(selectSumOfStars)
  const userData = isPrize ? userPoints : userStars

  const props = { count: value || userData, isPrize }
  return <PointsPresenter {...props} />
}
