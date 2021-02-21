import React from 'react'
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'

import { LoginButton } from '../LoginButton'

export const FacebookLogin = () => {
  const onPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])

      // TODO
      if (result.isCancelled) {
        console.log('User cancelled the login process')
        return
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        console.log('Something went wrong obtaining access token')
        return
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      )

      await auth().signInWithCredential(facebookCredential)
    } catch (e) {
      console.log(e)
      if (e?.code === 'auth/account-exists-with-different-credential') {
        const infoRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'email',
              },
            },
          },
          (err, res) => {
            if (res?.email) {
              auth()
                .fetchSignInMethodsForEmail(res.email)
                .then(async (providers) => {
                  console.log(providers)
                  const userInfo = await GoogleSignin.signInSilently()
                  if (userInfo?.user?.email === res.email) {
                    const googleCredential = auth.GoogleAuthProvider.credential(
                      userInfo.idToken,
                    )
                    return await auth().signInWithCredential(googleCredential)
                  }
                  // providers returns this array -> ["google.com"]
                  // You need to sign in the user to that google account
                  // with the same email.
                  // In a browser you can call:
                  // var provider = new firebase.auth.GoogleAuthProvider();
                  // provider.setCustomParameters({login_hint: error.email});
                  // firebase.auth().signInWithPopup(provider)
                  // If you have your own mechanism to get that token, you get it
                  // for that Google email user and sign in
                  // auth().signInWithCredential(googleCred)
                  //   .then(user => {
                  //     // You can now link the pending credential from the first
                  //     // error.
                  //     user.linkWithCredential(error.credential)
                  //   })
                  //   .catch(error => log(error))
                })
            }
          },
        )
        new GraphRequestManager().addRequest(infoRequest).start()
      }
    }
  }

  return <LoginButton name={'Facebook'} onPress={onPress} />
}
