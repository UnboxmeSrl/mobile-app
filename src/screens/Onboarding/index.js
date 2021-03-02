import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { SCREEN_NAMES } from '@const/navigation'

import { OnboardingScreenPresenter } from './OnboardingScreenPresenter'

export const OnboardingScreen = () => {
  const { navigate } = useNavigation()

  const onPress = () => navigate(SCREEN_NAMES.SignUp)

  return <OnboardingScreenPresenter onPress={onPress} />
}
