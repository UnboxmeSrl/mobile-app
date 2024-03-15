import { createSlice } from '@reduxjs/toolkit'
import { sliceNames } from '../../constants'

const initialState = {
  authData: {},
  loginData: {},
  isApplied: false,
<<<<<<< HEAD
  onboardingData: false,
=======
  isFirstTimeLogin: true,
  isSignUpProcessStarted: false,
  signUpProcessStage: 0,
>>>>>>> ea5f8f6e137a3d3b7e795a5e433b7664b1f2d3b5
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
<<<<<<< HEAD
    setOnboardingData: (state, { payload }) => {
      state.onboardingData = payload
=======
    setIsFirstTimeLogin: (state, actions) => {
      state.isFirstTimeLogin = actions?.payload
    },
    setIsSignUpProcessStarted: (state, actions) => {
      state.isSignUpProcessStarted = actions?.payload
    },
    setSignUpProcessStage: (state, actions) => {
      state.signUpProcessStage = actions?.payload
>>>>>>> ea5f8f6e137a3d3b7e795a5e433b7664b1f2d3b5
    },
  },
})

<<<<<<< HEAD
export const { setAuthData, setLoginData, setIsApplied, setOnboardingData } = AuthSlice.actions
=======
export const {
  setAuthData,
  setLoginData,
  setIsApplied,
  setIsFirstTimeLogin,
  setIsSignUpProcessStarted,
  setSignUpProcessStage,
} = AuthSlice.actions
>>>>>>> ea5f8f6e137a3d3b7e795a5e433b7664b1f2d3b5

export default AuthSlice.reducer

export const currentUserData = (state) => state.authSlice.loginData

export const selectOnBordingData = (state) => state.authSlice.onboardingData

export const isAuthenticated = (state) => state.authSlice.loginData?.id