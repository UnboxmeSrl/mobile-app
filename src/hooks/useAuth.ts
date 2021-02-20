import auth from '@react-native-firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '@redux/modules/auth'

export const useAuth = (): void => {
  const [initializing, setInitializing] = useState(true)
  const dispatch = useDispatch()

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userData) => {
      if (userData) {
        dispatch(setUser(userData?.toJSON()))
      }
      if (initializing) setInitializing(false)
    },
    [initializing, setInitializing, dispatch],
  )

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])
}
