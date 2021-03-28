import React, { useEffect } from 'react'
import { Linking } from 'react-native'

import { WizardStepReviewPresenter } from './WizardStepReviewPresenter'

export const WizardStepReview = () => {
  const openInstagram = async () => {
    Linking.openURL('https://www.instagram.com/unboxme__official/')
  }
  const props = { openInstagram }
  return <WizardStepReviewPresenter {...props} />
}
