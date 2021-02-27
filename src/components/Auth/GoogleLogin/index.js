import React, { useCallback } from 'react'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { Button } from '@components/Button'
import { COLORS, GOOGLE_CONFIG_AUTH } from '@const'

GoogleSignin.configure(GOOGLE_CONFIG_AUTH)

export const GoogleLogin = () => {
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

  return <Button bgColor={COLORS.google} onPress={onPress} tKey={'signUp.signUpWith'} tOptions={{name: 'Google'}} />
}
