import React, { useCallback } from 'react'
import Toast from 'react-native-toast-message'
import auth from '@react-native-firebase/auth'

import { SCREEN_NAMES } from '@const/navigation'
import { persistor } from '@redux/store'
import { logger, reset } from '@services'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'

export const SettingsScreen = () => {
  const onPress = useCallback(async () => {
    try {
      logger.info('Logout start')
      await auth().signOut()
      await persistor.purge()
      Toast.show({
        text1: 'Info',
        text2: "You've been logged out",
      })
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
