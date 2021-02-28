import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'

import { MAIN_NAVIGATOR, SCREEN_NAMES } from '@const/navigation'
import { selectUserUid, setUser } from '@redux/modules/auth'
import { reset } from '@services'

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const { replace } = useNavigation()
  const dispatch = useDispatch()

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userData) => {
      if (userData) {
        dispatch(setUser(userData?.toJSON()))
      } else {
        replace({ index: 0, routeName: SCREEN_NAMES.Onboarding })
      }
      if (initializing) setInitializing(false)
    },
    [initializing, setInitializing, dispatch]
  )

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])
}
