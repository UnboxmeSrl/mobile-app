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

import { userSignUp } from '../../services/ProfileService'

import { WizardStepReviewPresenter } from './WizardStepReviewPresenter'

export const WizardStepReview = () => {
  const isRejected = useSelector(selectIsRejected)
  const inReview = useSelector(selectIsInReview)
  const isVerified = useSelector(selectIsVerified)
  const userDetails = useSelector((state) => state.authSlice.authData)

  console.log('userDetails: ' + JSON.stringify(userDetails))

  const openInstagram = async () => {
    Linking.openURL('https://www.instagram.com/unboxme__official/')
  }
  const navigateToHome = async () => {
    const test = {
      city: 'Gdsff',
      dobTs: 1706130546134,
      email: 'abc@gmail.com',
      experienceType: 'zero', // not sending yet
      fullName: 'Abc',
      gender: 1,
      hasAgency: false, // Agency name field still needs
      password: '123456',
      username: 'fsfsf',
    }
    const prepData = {
      Agency: userDetails?.hasAgency,
      Birthday: userDetails?.dobTs,
      City: userDetails?.city,
      Freelance: !userDetails?.hasAgency,
      HasInstagram: 'false',
      HasTiktok: 'false',
      IG: 'false',
      NickName: userDetails?.username,
      TikTok: 'false',
      Tiktok_account: '',
      email: userDetails?.email,
      gender_list_id: userDetails?.gender,
      name: userDetails?.fullName,
      password: userDetails?.password,
      telegram_id: 0,
    }
    const res = await userSignUp(prepData)
    if (res?.id) {
      console.log('🟩 Success Data', res)
      reset(MAIN_NAVIGATOR)
    }
  }
  const tKey = inReview ? 'review.inReview' : isRejected ? 'review.rejected' : isVerified ? 'review.verified' : ''
  const props = { isRejected, isVerified, navigateToHome, openInstagram, tKey }
  return <WizardStepReviewPresenter {...props} />
}
