import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Button } from '@components/Button'
import { COLORS } from '@const'
import { logger, showToastError } from '@services'

export const FacebookLogin = ({ onSuccess, setLoading, loading }) => {
  const onPress = useCallback(async () => {
    try {
      setLoading(true)
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        logger.info('Facebook Login - login cancelled')
        setLoading(false)
        return
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        logger.error('Facebook Login - no data from getCurrentAccessToken')
        setLoading(false)
        return
      }

      // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

      // await auth().signInWithCredential(facebookCredential)
      setLoading(false)
      onSuccess && onSuccess()
    } catch (error) {
      setLoading(false)
      logger.error('FacebookError', { error })
      if (error?.code === 'auth/account-exists-with-different-credential') {
        // TODO
        showToastError('12321321')
        Alert.alert(
          'Whooops',
          'Your email is already associated with another social provider. Please try to login with Google/Apple',
          [{ onPress: () => console.log('OK Pressed'), text: 'OK' }],
          { cancelable: false }
        )
      }

      //   const infoRequest = new GraphRequest(
      //     '/me',
      //     {
      //       parameters: {
      //         fields: {
      //           string: 'email',
      //         },
      //       },
      //     },
      //     (err, res) => {
      //       if (res?.email) {
      //         auth()
      //           .fetchSignInMethodsForEmail(res.email)
      //           .then(async (providers) => {
      //             console.log(providers)
      //             const userInfo = await GoogleSignin.signInSilently()
      //             if (userInfo?.user?.email === res.email) {
      //               const googleCredential = auth.GoogleAuthProvider.credential(
      //                 userInfo.idToken,
      //               )
      //               return await auth().signInWithCredential(googleCredential)
      //             }
      //             // providers returns this array -> ["google.com"]
      //             // You need to sign in the user to that google account
      //             // with the same email.
      //             // In a browser you can call:
      //             // var provider = new firebase.auth.GoogleAuthProvider();
      //             // provider.setCustomParameters({login_hint: error.email});
      //             // firebase.auth().signInWithPopup(provider)
      //             // If you have your own mechanism to get that token, you get it
      //             // for that Google email user and sign in
      //             // auth().signInWithCredential(googleCred)
      //             //   .then(user => {
      //             //     // You can now link the pending credential from the first
      //             //     // error.
      //             //     user.linkWithCredential(error.credential)
      //             //   })
      //             //   .catch(error => log(error))
      //           })
      //       }
      //     },
      //   )
      //   new GraphRequestManager().addRequest(infoRequest).start()
      // }
    }
  }, [onSuccess, setLoading, showToastError])

  return (
    <Button
      bgColor={COLORS.facebook}
      leftIconName={'logo-facebook'}
      loading={loading}
      onPress={onPress}
      tKey={'signUp.signUpWith'}
      tOptions={{ name: 'Facebook' }}
    />
  )
}
