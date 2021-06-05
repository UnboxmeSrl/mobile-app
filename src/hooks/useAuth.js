import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { USERS_COLLECTION } from '@const/firebase'
import { useAction } from '@hooks/common'
import authModule, { _initialized, selectIsAuthInitialized, selectUid } from '@redux/modules/auth'
import { onAuthSuccess } from '@services/auth'

export const useAuth = () => {
  const setAuthData = useAction(authModule.actions.setData)
  const isInitialized = useSelector(selectIsAuthInitialized)
  const uid = useSelector(selectUid)

  const onAuthStateChanged = useCallback(
    (user) => {
      console.log('onAuthStateChanged', user)
      if (user) {
        console.log(auth().currentUser.getIdTokenResult(true))
        setAuthData(user.toJSON())
      } else {
        setAuthData({})
      }
      if (!isInitialized) setAuthData({ [_initialized]: true })
    },
    [isInitialized, setAuthData]
  )

  useEffect(() => {
    onAuthSuccess()
  }, [isInitialized])

  useEffect(() => {
    if (uid) {
      const subscriber = firestore()
        .collection(USERS_COLLECTION)
        .doc(uid)
        .onSnapshot((documentSnapshot) => {
          const data = documentSnapshot?.data()
          setAuthData(data)
        })
      return () => subscriber()
    }
  }, [setAuthData, uid])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])
}
