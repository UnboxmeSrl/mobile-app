import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { appleAuth } from '@invertase/react-native-apple-authentication'
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

    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential)
  }
}

export const AppleLogin: any = () => {
  if (!appleAuth.isSupported) {
    return null
  }
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      )
    })
  }, []) // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return <LoginButton onPress={onPress} name={'Apple'} />
}
