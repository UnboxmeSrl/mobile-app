import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    resetAuth: () => {
      state = initialState
    },
  },
})

export const { setUser, resetAuth } = authSlice.actions

export default authSlice.reducer
