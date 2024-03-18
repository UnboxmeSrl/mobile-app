import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'

import { MODAL_NAMES, SCREEN_NAMES } from '@const/navigation'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import authModule, {
  _initialized,
  selectBrands,
  selectCity,
  selectCreams,
  selectFullName,
  selectHasQuestionnaire,
  selectImage,
  selectInstagramUsername,
  // selectIsAuthenticated,
  selectSkincareRoutine,
  selectSkinType,
  selectTiktokUsername,
  selectUsername,
} from '@redux/modules/auth'

import { selectIsAuthenticated, userData } from '../../redux/slices/authSlice'

import { ProfileScreenPresenter } from './ProfileScreenPresenter'

export const ProfileScreen = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { navigate } = useNavigation()
  const navigateToWizard = () => navigate(SCREEN_NAMES.Wizard)
  const navigateToLogin = () => navigate(SCREEN_NAMES.SignUp)
  const navigateToQuestionnaire = () => navigate(SCREEN_NAMES.Questionnaire)
  const navigateToYourRating = () => navigate(MODAL_NAMES.YourRating)
  const navigateToAddresses = () => navigate(SCREEN_NAMES.Addresses)
  const navigateToInvite = () => navigate(MODAL_NAMES.InviteFriends)
  const navigateToSettings = () => navigate(SCREEN_NAMES.Settings)
  const navigateToEditProfile = () => navigate(SCREEN_NAMES.EditProfile)
  const hasQuestionnaire = useSelector(selectHasQuestionnaire)
  const skinType = useSelector(selectSkinType)
  const skincareRoutine = useSelector(selectSkincareRoutine)
  const creams = useSelector(selectCreams)
  const brands = useSelector(selectBrands)

  const navigateToOnboarding = useAuthenticatedAction(navigateToWizard)
  const fullName = useSelector(selectFullName)
  const username = useSelector(selectUsername)
  const city = useSelector(selectCity)
  const tiktokUsername = useSelector(selectTiktokUsername)
  const instagramUsername = useSelector(selectInstagramUsername)
  const image = useSelector(selectImage)
  const source = image ? { uri: image } : null
  const navigateTikTokModal = () => {
    navigate(MODAL_NAMES.Tiktok)
  }
  const props = {
    brands,
    city,
    creams,
    disabledSocial: !(tiktokUsername || instagramUsername),
    fullName,
    hasQuestionnaire,
    isAuthenticated,
    navigateTikTokModal,
    navigateToAddresses,
    navigateToEditProfile,
    navigateToInvite,
    navigateToLogin,
    navigateToOnboarding,
    navigateToQuestionnaire,
    navigateToSettings,
    navigateToYourRating,
    skinType,
    skincareRoutine,
    source,
    tiktokUsername,
    username,
  }
  return <ProfileScreenPresenter {...props} />
}
