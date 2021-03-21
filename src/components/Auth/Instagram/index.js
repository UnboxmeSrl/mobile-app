import React, { useCallback, useRef } from 'react'
import { Alert } from 'react-native'
import InstagramLogin from 'react-native-instagram-login'

import { Button } from '@components/Button'
import { COLORS } from '@const'
import { logger } from '@services'

export const Instagram = ({ onSuccess, setLoading, loading }) => {
  const ref = useRef()
  console.log(ref)

  const onLoginSuccess = useCallback(() => {}, [])
  const onPress = useCallback(() => {
    console.log(ref)
    ref.current?.show()
  }, [ref])
  return (
    <>
      <Button
        bgColor={COLORS.facebook}
        leftIconName={'logo-facebook'}
        loading={loading}
        onPress={onPress}
        tKey={'signUp.signUpWith'}
        tOptions={{ name: 'Facebook' }}
      />
      <InstagramLogin
        appId="770594490219754"
        appSecret="24c77bc3a620ced73dbb001c1d6f195b"
        onLoginFailure={logger.error}
        onLoginSuccess={onLoginSuccess}
        redirectUrl="https://unboxme-firebase.firebaseapp.com/"
        ref={ref}
        scopes={['user_profile', 'user_media']}
      />
    </>
  )
}
