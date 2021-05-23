import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { MODAL_NAMES, SCREEN_NAMES } from '@const/navigation'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import authModule, {
  _initialized,
  selectBrands,
  selectCity,
  selectCreams,
  selectFullName,
  selectHasQuestionnaire,
  selectInstagramUsername,
  selectIsAuthenticated,
  selectSkincareRoutine,
  selectSkinType,
  selectTiktokUsername,
  selectUsername,
} from '@redux/modules/auth'
import { persistor } from '@redux/store'
import { logger, showToastSuccess } from '@services'

import { ProfileScreenPresenter } from './ProfileScreenPresenter'

export const ProfileScreen = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const resetAuth = useAction(authModule.actions.reset)

  const { navigate } = useNavigation()
  const navigateToWizard = () => navigate(SCREEN_NAMES.Wizard)
  const navigateToLogin = () => navigate(SCREEN_NAMES.SignUp)
  const navigateToQuestionnaire = () => navigate(SCREEN_NAMES.Questionnaire)
  const navigateToYourRating = () => navigate(MODAL_NAMES.YourRating)
  const navigateToAddresses = () => navigate(SCREEN_NAMES.Addresses)
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

  const navigateTikTokModal = () => {
    navigate(MODAL_NAMES.Tiktok)
  }

  const handleLogout = useCallback(async () => {
    try {
      await persistor.purge()
      resetAuth({ [_initialized]: true })
      await auth().signOut()
      await GoogleSignin.signOut()
      showToastSuccess("You've been logged out")
      logger.info('Logout succeded')
    } catch (error) {
      logger.error('Logout error', { error })
    }
  }, [resetAuth])
  console.log(skincareRoutine)
  const props = {
    brands,
    city,
    creams,
    disabledSocial: !(tiktokUsername || instagramUsername),
    fullName,
    handleLogout,
    hasQuestionnaire,
    isAuthenticated,
    navigateTikTokModal,
    navigateToAddresses,
    navigateToLogin,
    navigateToOnboarding,
    navigateToQuestionnaire,
    navigateToYourRating,
    skinType,
    skincareRoutine,
    tiktokUsername,
    username,
  }
  return <ProfileScreenPresenter {...props} />
}
