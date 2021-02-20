import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import React, { useCallback } from 'react'

import { LoginButton } from '@components/Auth/LoginButton'
import { GOOGLE_CONFIG_AUTH } from '@const'
console.log(GOOGLE_CONFIG_AUTH)
GoogleSignin.configure(GOOGLE_CONFIG_AUTH)

export const GoogleLogin: any = () => {
  const onPress = useCallback(async () => {
    try {
      const { idToken, ...rest } = await GoogleSignin.signIn()
      console.log(rest)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      return await auth().signInWithCredential(googleCredential)
    } catch (e) {
      console.log({ e })
    }
  }, [])

  return <LoginButton name={'Google'} onPress={onPress} />
}
