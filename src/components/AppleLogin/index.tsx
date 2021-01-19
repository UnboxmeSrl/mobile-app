import React, { useEffect } from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { AppleLoginPresenter } from './AppleLoginPresenter'

const onPress = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  )

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
}

export const AppleLogin: any = () => {
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      )
    })
  }, []) // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
  return <AppleLoginPresenter onPress={onPress} />
}
