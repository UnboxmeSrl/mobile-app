import React from 'react'

import { PointsPresenter } from './PointsPresenter'

export const Points = () => {
  const points = 45
  const props = { points }
  return <PointsPresenter {...props} />
}
