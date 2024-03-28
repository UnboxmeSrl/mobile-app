import React from 'react'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { selectIsVerified } from '@redux/modules/auth'
import { reset } from '@services'

import { resetAuthData, setLoginData } from '../../redux/slices'
import { isPending, userRejected } from '../../redux/slices/tempAuth'
import { userSignUp } from '../../services/ProfileService'

import { WizardStepReviewPresenter } from './WizardStepReviewPresenter'

export const WizardStepReview = () => {
  const dispatch = useDispatch()
  const isRejected = useSelector(userRejected)
  const inReview = useSelector(isPending)
  const isVerified = useSelector(selectIsVerified)
  const userDetails = useSelector((state) => state.authSlice.authData)

  console.log('userDetails: ', userDetails)

  const openInstagram = async () => {
    Linking.openURL('https://www.instagram.com/unboxme__official/')
  }
  const navigateToHome = async () => {
    // const test = {
    //   city: 'Gdsff',
    //   dobTs: 1706130546134,
    //   email: 'abc@gmail.com',
    //   experienceType: 'zero', // not sending yet
    //   fullName: 'Abc',
    //   gender: 1,
    //   hasAgency: false, // Agency name field still needs
    //   password: '123456',
    //   username: 'fsfsf',
    // }
    const formData = new FormData({
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
    })
    const profilePicData = userDetails?.profilePictures?.[0]
    if (profilePicData && profilePicData?.uri) {
      formData.append('profileImage', {
        name: profilePicData.fileName,
        type: profilePicData.type,
        uri: profilePicData.uri,
      })
    } else {
      formData.append('profileImage', {
        name: 'rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.claris.app/cache/rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
      })
    }

    const res = await userSignUp(formData)
    console.log('🟩 Success Data before', res)
    if (res?.id) {
      console.log('🟩 Success Data', res)
      dispatch(resetAuthData())
      dispatch(setLoginData(res))
      reset(MAIN_NAVIGATOR)
    }
  }
  const tKey = inReview ? 'review.inReview' : isRejected ? 'review.rejected' : isVerified ? 'review.verified' : ''
  const props = { isRejected, isVerified, navigateToHome, openInstagram, tKey }
  return <WizardStepReviewPresenter {...props} />
}
