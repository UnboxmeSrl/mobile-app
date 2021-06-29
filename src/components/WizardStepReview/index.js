import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { useSelector } from 'react-redux'

import { MAIN_NAVIGATOR } from '@const/navigation'
import {
  selectDobTs,
  selectIsInReview,
  selectIsRejected,
  selectIsVerified,
  selectVerificationStatus,
} from '@redux/modules/auth'
import { reset } from '@services'

import { WizardStepReviewPresenter } from './WizardStepReviewPresenter'

export const WizardStepReview = () => {
  const isRejected = useSelector(selectIsRejected)
  const inReview = useSelector(selectIsInReview)
  const isVerified = useSelector(selectIsVerified)

  const openInstagram = async () => {
    Linking.openURL('https://www.instagram.com/unboxme__official/')
  }
  const navigateToHome = () => {
    reset(MAIN_NAVIGATOR)
  }
  const tKey = inReview ? 'review.inReview' : isRejected ? 'review.rejected' : isVerified ? 'review.verified' : ''
  const props = { isRejected, isVerified, navigateToHome, openInstagram, tKey }
  return <WizardStepReviewPresenter {...props} />
}
