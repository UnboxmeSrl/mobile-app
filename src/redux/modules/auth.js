import { createSelector, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

const NAMESPACE = 'auth'

const _uid = 'uid'
const _name = 'name'
const _gender = 'gender'
const _username = 'username'

const initialState = {}

export const authSlice = createSlice({
  initialState,
  name: NAMESPACE,
  reducers: {
    resetAuth: () => initialState,
    setUser: (state, { payload }) => payload,
    updateUser: (state, { payload }) => ({ ...state, ...payload }),
  },
})

export const { setUser, resetAuth, updateUser } = authSlice.actions
export default authSlice.reducer

export const selectState = prop(NAMESPACE)
export const selectUserUid = createSelector(selectState, prop(_uid))
export const selectIsUserLogged = createSelector(selectUserUid, Boolean)
export const selectName = createSelector(selectState, prop(_name))
export const selectGender = createSelector(selectState, prop(_gender))
export const selectUsername = createSelector(selectState, prop(_username))
