import React from 'react'
import { useSelector } from 'react-redux'

import { selectAllBoxes } from '@redux/modules/boxes'

import CitiesScreen from '../Cities/CitiesScreen'

import { HomeScreenPresenter } from './HomeScreenPresenter'

export const HomeScreen = () => {
  const boxes = useSelector(selectAllBoxes)

  // return <HomeScreenPresenter boxes={boxes} />
  return <CitiesScreen />
}
