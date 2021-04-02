import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { SCREEN_NAMES } from '@const/navigation'

import { QuestionnaireThankYouPresenter } from './QuestionnaireThankYouPresenter'

export const QuestionnaireThankYouModal = () => {
  const { navigate, goBack } = useNavigation()

  const onPress = () => {
    goBack()
  }

  const props = {
    onPress,
  }

  return <QuestionnaireThankYouPresenter {...props} />
}
