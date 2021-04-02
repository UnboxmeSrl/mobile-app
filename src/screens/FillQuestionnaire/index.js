import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { SCREEN_NAMES } from '@const/navigation'

import { FillQuestionnairePresenter } from './FillQuestionnairePresenter'

export const FillQuestionnaireModal = () => {
  const { navigate } = useNavigation()
  const navigateToQuestionnaire = () => navigate(SCREEN_NAMES.Questionnaire)

  const props = {
    navigateToQuestionnaire,
  }

  return <FillQuestionnairePresenter {...props} />
}
