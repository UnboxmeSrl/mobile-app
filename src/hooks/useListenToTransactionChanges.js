import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { TRANSACTIONS_COLLECTION, USERS_COLLECTION } from '@const/firebase'
import { useAction } from '@hooks/common'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { setDataFirestore } from '@redux/modules/transactions'

export const useListenToTransactionChanges = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const setData = useAction(setDataFirestore)

  useEffect(() => {
    if (isAuthenticated) {
      const subscriber = firestore()
        .collection(TRANSACTIONS_COLLECTION)
        .where('user', '==', firestore().collection(USERS_COLLECTION).doc(auth().currentUser?.uid))
        .onSnapshot((snapshot) => {
          const data = snapshot?.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
          setData(data)
          // console.log('documentSnapshot: ', snapshot.docs.data())
        })

      // Stop listening for updates when no longer required
      return () => subscriber()
    }
  }, [isAuthenticated])
}
