import React, { useCallback } from 'react'
import Toast from 'react-native-toast-message'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { SCREEN_NAMES } from '@const/navigation'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import authModule, { _initialized, selectIsAuthenticated } from '@redux/modules/auth'
import { persistor } from '@redux/store'
import { logger, showToastSuccess } from '@services'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'

export const SettingsScreen = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const resetAuth = useAction(authModule.actions.reset)

  const { navigate } = useNavigation()
  const navigateToWizard = () => navigate(SCREEN_NAMES.Wizard)
  const navigateToLogin = () => navigate(SCREEN_NAMES.SignUp)
  const navigateToOnboarding = useAuthenticatedAction(navigateToWizard)

  const onPress = useCallback(async () => {
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

  const props = {
    isAuthenticated,
    navigateToLogin,
    navigateToOnboarding,
    onPress,
  }
  return <SettingsScreenPresenter {...props} />
}
