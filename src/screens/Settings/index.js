import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { SCREEN_NAMES } from '@const/navigation'
import { persistor } from '@redux/store'
import { logger, reset } from '@services'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'

export const SettingsScreen = () => {
  const { replace } = useNavigation()
  const onPress = useCallback(async () => {
    try {
      logger.info('Logout start')
      // replace({ index: 0, routeName: SCREEN_NAMES.Onboarding })
      await auth().signOut()
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      await persistor.purge()
      logger.info('Logout succeded')
    } catch (error) {
      logger.error('Logout error', { error })
    }
  }, [])

  const props = {
    onPress,
  }
  return <SettingsScreenPresenter {...props} />
}
