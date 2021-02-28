import { createSelector, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

const NAMESPACE = 'auth'

const _uid = 'uid'

const initialState = {}

export const authSlice = createSlice({
  initialState,
  name: NAMESPACE,
  reducers: {
    resetAuth: () => initialState,
    setUser: (state, { payload }) => payload,
  },
})

export const { setUser, resetAuth } = authSlice.actions
export default authSlice.reducer

export const selectState = prop(NAMESPACE)
export const selectUserUid = createSelector(selectState, prop(_uid))
