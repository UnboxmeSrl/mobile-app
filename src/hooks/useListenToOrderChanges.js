import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { ORDERS_COLLECTION, USERS_COLLECTION } from '@const/firebase'
import { useAction } from '@hooks/common'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { setDataFirestore } from '@redux/modules/orders'

export const useListenToOrderChanges = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const setData = useAction(setDataFirestore)

  useEffect(() => {
    if (isAuthenticated) {
      const subscriber = firestore()
        .collection(ORDERS_COLLECTION)
        .where('user', '==', firestore().collection(USERS_COLLECTION).doc(auth().currentUser?.uid))
        .onSnapshot((snapshot) => {
          const data = snapshot?.docs.map((doc) => doc.data())
          setData(data)
          // console.log('documentSnapshot: ', snapshot.docs.data())
        })

      // Stop listening for updates when no longer required
      return () => subscriber()
    }
  }, [isAuthenticated])
}
