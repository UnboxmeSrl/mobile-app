import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'
import React from 'react'

import { LoginButton } from '@components/Auth/LoginButton'

const onPress = async (): Promise<any> => {
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

export const AppleLogin: any = () => {
  if (!appleAuth.isSupported) {
    return null
  }

  return <LoginButton name={'Apple'} onPress={onPress} />
}
