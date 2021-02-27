import React from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'

import { Button } from '@components/Button'
import { COLORS } from '@const'

const onPress = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  )

  if (credentialState === appleAuth.State.AUTHORIZED) {
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    await auth().signInWithCredential(appleCredential)
  }
}

export const AppleLogin = () => {
  if (!appleAuth.isSupported) {
    return null
  }

  return <Button bgColor={COLORS.blackRaw} onPress={onPress} tKey={'signUp.signUpWith'} tOptions={{name: 'Apple'}}/>
}
