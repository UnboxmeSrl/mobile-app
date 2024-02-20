import React, { useCallback, useMemo } from 'react'
import { Alert } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import Share from 'react-native-share'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import CookieManager from '@react-native-community/cookies'
import { GoogleSignin } from '@react-native-community/google-signin'
import { SettingsPresenter } from '@screens/Settings/SettingsPresenter'

import { IconButton } from '@components/IconButton'
import { COLORS } from '@const'
import { MAIN_NAVIGATOR, SCREEN_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import authModule, { _initialized, _instagram, selectIsAuthenticated, selectWizardCode } from '@redux/modules/auth'
import { persistor } from '@redux/store'
import { logger, reset, showToastSuccess } from '@services'

const version = getVersion()
const buildNumber = getBuildNumber()

const LogoutIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'log-out-outline'} size={24} />

export const SettingsScreen = () => {
  const { navigate } = useNavigation()
  const resetAuth = useAction(authModule.actions.reset)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigateToAddresses = () => navigate(SCREEN_NAMES.Addresses)

  const logout = useCallback(async () => {
    try {
      reset(MAIN_NAVIGATOR)

      await persistor.purge()
      await GoogleSignin.signOut()
      showToastSuccess("You've been logged out")
      logger.info('Logout succeded')
    } catch (error) {
      logger.error('Logout error', { error })
    }
  }, [, reset])

  const handleLogout = useCallback(async () => {
    Alert.alert('Confirmation', 'Are you sure you want to log out?', [
      {
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          logout()
        },
        text: 'Logout',
      },
    ])
  }, [logout])
  const RightButton = useCallback(() => <IconButton Icon={LogoutIcon} onPress={handleLogout} />, [handleLogout])
  const versionName = `${version} (${buildNumber})`
  const props = { RightButton, handleLogout, isAuthenticated, navigateToAddresses, versionName }
  return <SettingsPresenter {...props} />
}
