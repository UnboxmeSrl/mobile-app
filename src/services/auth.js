import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { isEmpty } from 'ramda'

import { logger } from './logger'

export const checkIfEmailIsAvailable = async (email) => {
  try {
    const providers = await auth().fetchSignInMethodsForEmail(email)
    return isEmpty(providers)
  } catch (error) {
    logger.error('checkIfEmailIsAvailable', { error })
  }
}

export const registerEmailAccount = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password)
    await res?.user?.sendEmailVerification()
    return res
  } catch (error) {
    logger.error('registerEmailAccount', { error })
  }
}

export const signInWithEmail = async (email, password) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password)
    console.log({ user })
    return user
  } catch (error) {
    Alert.alert(
      'Whooops',
      'The email and password combination is not correct. Please try again.',
      [{ onPress: () => console.log('OK Pressed'), text: 'OK' }],
      { cancelable: false }
    )
    logger.error('signInWithEmail', { error })
  }
}
