import React, { useCallback } from 'react'
import Share from 'react-native-share'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import { SettingsPresenter } from '@screens/Settings/SettingsPresenter'

import { MAIN_NAVIGATOR, SCREEN_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import authModule, { _initialized, selectIsAuthenticated, selectWizardCode } from '@redux/modules/auth'
import { persistor } from '@redux/store'
import { logger, reset, showToastSuccess } from '@services'

export const SettingsScreen = () => {
  const resetAuth = useAction(authModule.actions.reset)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleLogout = useCallback(async () => {
    try {
      reset(MAIN_NAVIGATOR)

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
  const props = { handleLogout, isAuthenticated }
  return <SettingsPresenter {...props} />
}
