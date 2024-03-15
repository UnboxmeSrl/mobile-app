import { createSlice } from '@reduxjs/toolkit'
import { sliceNames } from '../../constants'

const initialState = {
  authData: {},
  loginData: {},
  isApplied: false,
  onboardingData: false,
  isFirstTimeLogin: true,
  isSignUpProcessStarted: false,
  signUpProcessStage: 0,
}

const AuthSlice = createSlice({
  initialState: initialState,
  name: sliceNames.authSlice,
  reducers: {
    resetLogin: (state) => {
      state.loginData = {}
    },
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
    setIsFirstTimeLogin: (state, actions) => {
      state.isFirstTimeLogin = actions?.payload
    },
    setIsSignUpProcessStarted: (state, actions) => {
      state.isSignUpProcessStarted = actions?.payload
    },
    setSignUpProcessStage: (state, actions) => {
      state.signUpProcessStage = actions?.payload
    },
  },
})

export const {
  resetLogin,
  setAuthData,
  setLoginData,
  setIsApplied,
  setIsFirstTimeLogin,
  setIsSignUpProcessStarted,
  setSignUpProcessStage,
  setOnboardingData,
} = AuthSlice.actions

export default AuthSlice.reducer

export const currentUserData = (state) => state.authSlice.loginData

export const selectOnBordingData = (state) => state.authSlice.onboardingData

export const selectIsAuthenticated = (state) => state.authSlice.loginData?.id
