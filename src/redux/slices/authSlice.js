import { createSlice } from '@reduxjs/toolkit'

import { sliceNames } from '../../constants'

const initialState = {
  authData: {},
}

const AuthSlice = createSlice({
  initialState: initialState,
  name: sliceNames.authSlice,
  reducers: {
    setAuthData: (state, actions) => {
      console.log('Auth Data set Action', actions?.payload)
      state.authData = {
        ...state.authData,
        ...actions?.payload,
      }
      console.log('Settled Auth Data', state.authData)
    },
  },
})

export const { setAuthData } = AuthSlice.actions

export default AuthSlice.reducer
