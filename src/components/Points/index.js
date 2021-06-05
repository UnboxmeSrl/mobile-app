import React from 'react'
import { useSelector } from 'react-redux'

import { selectSumOfPoints } from '@redux/modules/transactions'

import { PointsPresenter } from './PointsPresenter'

export const Points = ({ points }) => {
  const userPoints = useSelector(selectSumOfPoints)
  const props = { points: points || userPoints }
  return <PointsPresenter {...props} />
}
