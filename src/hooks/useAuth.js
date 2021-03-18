import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { SCREEN_NAMES } from '@const/navigation'
import { selectUserUid, setUser, updateUser } from '@redux/modules/auth'

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const { replace } = useNavigation()
  const dispatch = useDispatch()
  const userId = useSelector(selectUserUid)

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userData) => {
      if (userData) {
        dispatch(setUser(userData?.toJSON()))
      } else {
        replace({ index: 0, routeName: SCREEN_NAMES.Wizard })
      }
      if (initializing) setInitializing(false)
    },
    [initializing, setInitializing, dispatch]
  )
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data()
        dispatch(updateUser(data))
      })
    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((user) => {
        const data = user.data()
        dispatch(updateUser(data))
      })
      .catch((e) => {
        console.log(e)
      })

    // Stop listening for updates when no longer required
    return () => subscriber()
  }, [userId])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])
}
