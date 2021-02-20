import { createSlice } from '@reduxjs/toolkit'

const _user = 'user'

interface AuthState {
  [_user]: object
}

const initialState: AuthState = { [_user]: {} }

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setUser: (state, { payload }) => (state[_user] = payload),
  },
})

export const { setUser, resetAuth } = authSlice.actions

export default authSlice.reducer
