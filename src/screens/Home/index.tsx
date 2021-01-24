import React, { useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import { HomeScreenPresenter } from './HomeScreenPresenter'
import { GoogleSignin } from '@react-native-community/google-signin'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/rootReducer'
import { propOr, pipe, head, prop } from 'ramda'

export const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  console.log(user)
  const email =
    user?.email || pipe(propOr([], 'providerData'), head, prop('email'))(user)
  const photo = user?.photoURL
  const displayName = user?.displayName
  console.log(photo)
  const onPress = useCallback(async () => {
    auth().signOut()
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  }, [])

  const props = {
    onPress,
    email,
    photo: photo?.replace('=s96-c', ''),
    displayName,
  }
  return <HomeScreenPresenter {...props} />
}
