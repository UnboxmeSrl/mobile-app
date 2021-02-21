
import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { SettingsScreenPresenter } from './SettingsScreenPresenter'

export const SettingsScreen= () => {
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
