import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { isEmpty } from 'ramda'

import { USERS_COLLECTION } from '@const/firebase'
import { MAIN_NAVIGATOR, SCREEN_NAMES } from '@const/navigation'
import { VERIFIED_USER } from '@const/verification'
import { _isVerified, _tiktokUsername, _verificationStatus } from '@redux/modules/auth'
import i18n from '@services/i18n'

import { logger } from './logger'
import { navigate, replace, reset } from './navigation'
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
    Alert.alert(i18n.t('auth.whoops'), i18n.t('auth.wrongCombination'), [{ text: 'OK' }], {
      cancelable: false,
    })
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

export const onAuthSuccess = async () => {
  try {
    const uid = auth().currentUser?.uid
    if (uid) {
      const data = await firestore().collection(USERS_COLLECTION).doc(uid).get()
      const verificationStatus = data.get(_verificationStatus)

      if (verificationStatus === VERIFIED_USER) {
        navigate(SCREEN_NAMES.Settings)
      } else {
        navigate(SCREEN_NAMES.Wizard, { [_verificationStatus]: verificationStatus })
      }
    }
  } catch (error) {
    logger.error('onAuthSuccess', { error })
  }
}
