import React, { useCallback } from 'react'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { Button } from '@components/Button'
import { COLORS, GOOGLE_CONFIG_AUTH } from '@const'
import { logger } from '@services'

GoogleSignin.configure(GOOGLE_CONFIG_AUTH)

export const GoogleLogin = ({ onSuccess, setLoading, loading }) => {
  const onPress = useCallback(async () => {
    try {
      setLoading(true)
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      await auth().signInWithCredential(googleCredential)
      onSuccess && onSuccess()
      setLoading(false)
    } catch (error) {
      logger.error('Google Login', { error })
      setLoading(false)
    }
  }, [onSuccess, setLoading])

  return (
    <Button
      bgColor={COLORS.google}
      leftIconName={'logo-google'}
      loading={loading}
      onPress={onPress}
      tKey={'signUp.signUpWith'}
      tOptions={{ name: 'Google' }}
    />
  )
}
