import { createSelector, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

const NAMESPACE = 'auth'

const _uid = 'uid'
const _name = 'name'
const _gender = 'gender'
const _username = 'username'
export const _city = 'city'
export const _dateOfBirth = 'dateOfBirth'
export const _isAgency = 'isAgency'
export const _agencyName = 'agencyName'

const initialState = {}

export const authSlice = createSlice({
  initialState,
  name: NAMESPACE,
  reducers: {
    resetAuth: () => initialState,
    setUser: (state, { payload }) => payload,
    updateUser: (state, { payload }) => {
      const data = {
        ...state,
        ...payload,
      }
      return data
    },
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
export const selectDateOfBirth = createSelector(selectState, prop(_dateOfBirth))
export const selectCity = createSelector(selectState, prop(_city))
export const selectIsAgency = createSelector(selectState, prop(_isAgency))
export const selectAgencyName = createSelector(selectState, prop(_agencyName))
