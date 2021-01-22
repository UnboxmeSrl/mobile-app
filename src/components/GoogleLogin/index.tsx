import React, { useCallback } from 'react'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import { GoogleLoginPresenter } from './GoogleLoginPresenter'

GoogleSignin.configure()

export const GoogleLogin: any = () => {
  const onPress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }, [])
  return <GoogleLoginPresenter onPress={onPress} />
}
