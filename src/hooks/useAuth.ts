import { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { rootReset } from '@nav/RootNavigator'
import { SCREEN_NAMES, STACK_NAMES } from '@nav/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@redux/auth'
import { RootState } from '@redux/rootReducer'

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    dispatch(setUser(user?.toJSON()))
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  useEffect(() => {
    if (user?.uid) {
      rootReset(STACK_NAMES.TAB_STACK)
    } else {
      // rootReset(SCREEN_NAMES.LOGIN)
    }
  }, [user?.uid])

  return null
}
