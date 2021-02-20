
import React, { useCallback } from 'react'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'
import { ERouterScreens, ERouterStacks } from '@types'
import { useNavigation } from 'react-navigation-hooks'

export const SettingsScreen: React.FC = () => {
  const { navigate } = useNavigation()
  const onPress = useCallback(async () => {
    // await auth().signOut()
    // await GoogleSignin.revokeAccess()
    // await GoogleSignin.signOut()
    // await persistor.purge()

    navigate(ERouterScreens.Login)
  }, [])

  const props = {
    onPress,
  }
  return <SettingsScreenPresenter {...props} />
}
