import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const ref = firestore().collection('users')

export const updateMe = async ({ payload, upsert }) => {
  const user = auth().currentUser

  if (user) {
    const doc = await ref.doc(user.uid).get()
    if (doc.exists) {
      await ref.doc(user.uid).update(payload)
    } else if (upsert) {
      await ref.doc(user.uid).set(payload)
    }
  } else {
    throw new Error(`[updateMe] Can't update - no current user`)
  }
}
