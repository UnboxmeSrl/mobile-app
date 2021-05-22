import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectBoxById } from '@redux/modules/boxes'

import { YourRatingPresenter } from './YourRating'

export const YourRatingModal = () => {
  const { goBack } = useNavigation()

  const onPress = () => {
    goBack()
  }

  const props = {
    onPress,
  }

  return <YourRatingPresenter {...props} />
}
