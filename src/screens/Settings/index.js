import React, { useCallback } from 'react'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { SCREEN_NAMES } from '@const/navigation'
import { selectIsUserLogged } from '@redux/modules/auth'
import { persistor } from '@redux/store'
import { logger, reset } from '@services'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'

export const SettingsScreen = () => {
  const isLogged = useSelector(selectIsUserLogged)

  const onPress = useCallback(async () => {
    try {
      logger.info('Logout start')
      await auth().signOut()
      await GoogleSignin.signOut()
      await persistor.purge()
      await Toast.show({
        text1: 'Info',
        text2: "You've been logged out",
      })
      logger.info('Logout succeded')
    } catch (error) {
      logger.error('Logout error', { error })
    }
  }, [])

  const props = {
    isLogged,
    onPress,
  }
  return <SettingsScreenPresenter {...props} />
}
