import { createSlice } from '@reduxjs/toolkit'

import { sliceNames } from '../../constants'

const initialState = {
  authData: {},
  loginData: {},
  isApplied: false,
  onboardingData: false,
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
    setLoginData: (state, actions) => {
      state.loginData = actions?.payload
    },
    setIsApplied: (state, actions) => {
      state.isApplied = actions?.payload
    },
    setOnboardingData: (state, { payload }) => {
      state.onboardingData = payload
    },
  },
})

export const { setAuthData, setLoginData, setIsApplied, setOnboardingData } = AuthSlice.actions

export default AuthSlice.reducer

export const currentUserData = (state) => state.authSlice.loginData

export const selectOnBordingData = (state) => state.authSlice.onboardingData
