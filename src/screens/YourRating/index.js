import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { __, divide, map, median, pipe, prop, propOr, sum } from 'ramda'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'
import { selectOrderByBoxId } from '@redux/modules/orders'

import { YourRatingPresenter } from './YourRating'

export const YourRatingModal = () => {
  const { goBack } = useNavigation()
  const boxId = useNavigationParam('boxId')
  const order = useSelector(selectOrderByBoxId(boxId))
  const score = pipe(propOr([], 'feedback'), map(prop('value')), median)(order)
  const onPress = () => {
    goBack()
  }

  const props = {
    onPress,
    order,
    score,
  }

  return <YourRatingPresenter {...props} />
}
