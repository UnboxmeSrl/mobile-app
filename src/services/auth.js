import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { isEmpty } from 'ramda'

import i18n from '@services/i18n'

import { logger } from './logger'
import { showToastError, showToastSuccess } from './toast'

export const checkIfEmailIsAvailable = async (email) => {
  try {
    const providers = await auth().fetchSignInMethodsForEmail(email)
    return isEmpty(providers)
  } catch (error) {
    showToastError(error?.message)
    logger.error('checkIfEmailIsAvailable', { error })
  }
}

export const registerEmailAccount = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password)
    await res?.user?.sendEmailVerification()
    return res
  } catch (error) {
    showToastError(error?.message)
    logger.error('registerEmailAccount', { error })
  }
}

export const signInWithEmail = async (email, password) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password)
    return user
  } catch (error) {
    Alert.alert(
      i18n.t('auth.whoops'),
      i18n.t('auth.wrongCombination'),
      [{ text: 'OK' }],
      {
        cancelable: false,
      }
    )
    logger.error('signInWithEmail', { error })
  }
}

export const sendPhoneVerificationCode = async (phone) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phone)
    showToastSuccess(i18n.t('auth.codeSent'))
    return confirmation
  } catch (error) {
    if (error.code === 'auth/invalid-verification-code') {
      showToastError(i18n.t('auth.wrongCode'))
    } else {
      showToastError(error?.message)
    }
    logger.error('sendPhoneVerificationCode', { error })
  }
}
