import React, { useCallback } from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'

import { Button } from '@components/Button'
import { COLORS } from '@const'
import { logger } from '@services'

export const AppleLogin = ({ onSuccess, setLoading, loading }) => {
  const handleAppleLogin = useCallback(async () => {
    try {
      setLoading(true)
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      )

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, nonce } = appleAuthRequestResponse
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

        await auth().signInWithCredential(appleCredential)
        setLoading(false)
        onSuccess && onSuccess()
      }
      setLoading(false)
    } catch (error) {
      logger.error('handleAppleLogin', { error })
      setLoading(false)
    }
  }, [onSuccess, setLoading])

  if (!appleAuth.isSupported) {
    return null
  }

  return (
    <Button
      bgColor={COLORS.blackRaw}
      loading={loading}
      onPress={handleAppleLogin}
      tKey={'signUp.signUpWith'}
      tOptions={{ name: 'Apple' }}
    />
  )
}
