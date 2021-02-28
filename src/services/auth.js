import auth from '@react-native-firebase/auth'
import { isEmpty } from 'ramda'

export const checkIfEmailIsAvailable = async (email) => {
  try {
    console.log('checking email', email)
    const providers = await auth().fetchSignInMethodsForEmail(email)
    return isEmpty(providers)
  } catch (e) {
    console.error(e)
  }
}

export const registerEmailAccount = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password)
    await res?.user?.sendEmailVerification()
    return res
  } catch (e) {
    console.error(e)
  }
}
