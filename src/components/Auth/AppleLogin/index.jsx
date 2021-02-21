import React from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'

import { LoginButton } from '@components/Auth/LoginButton'

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

  return <LoginButton name={'Apple'} onPress={onPress} />
}
