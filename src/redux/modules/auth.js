import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { prop, propOr } from 'ramda'

import { USERS_COLLECTION } from '@const/firebase'
import { createReduxModule } from '@redux/createModule'

export const AUTH_NAMESPACE = 'auth'

export const _initialized = 'initialized'
export const _uid = 'uid'
export const _fullName = 'fullName'
export const _gender = 'gender'
export const _username = 'username'
export const _city = 'city'
export const _dobTs = 'dobTs'
export const _hasAgency = 'hasAgency'
export const _agencyName = 'agencyName'
export const _tiktokUsername = 'tiktokUsername'

const initialState = {
  [_initialized]: false,
}

const ref = firestore().collection(USERS_COLLECTION)

export const updateMe = createAsyncThunk(
  `${AUTH_NAMESPACE}/updateMe`,
  async (payload) => {
    const user = auth().currentUser
    const uid = user?.uid
    const doc = await ref.doc(uid).get()

    if (doc.exists) {
      return await ref.doc(uid).update({ ...payload, uid })
    } else {
      return await ref.doc(uid).set({ uid, ...payload })
    }
  }
)

const {
  slice,
  selectors: { selectState },
} = createReduxModule({ initialState, name: AUTH_NAMESPACE })

export const selectUid = createSelector(selectState, prop(_uid))
export const selectIsAuthenticated = createSelector(selectUid, Boolean)
export const selectFullName = createSelector(selectState, prop(_fullName))
export const selectGender = createSelector(selectState, prop(_gender))
export const selectUsername = createSelector(selectState, prop(_username))
export const selectDobTs = createSelector(selectState, propOr(+new Date(), _dobTs))
export const selectCity = createSelector(selectState, prop(_city))
export const selectHasAgency = createSelector(selectState, prop(_hasAgency))
export const selectAgencyName = createSelector(selectState, prop(_agencyName))
export const selectIsAuthInitialized = createSelector(selectState, prop(_initialized))
export const selectTiktokUsername = createSelector(selectState, prop(_tiktokUsername))

export default slice
