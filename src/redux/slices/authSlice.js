import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

import { sliceNames } from '../../constants'

const initialState = {
  authData: {},
  isApplied: false,
  isFirstTimeLogin: true,
  isSignUpProcessStarted: false,
  loginData: {},
  onboardingData: false,
  profileData: {},
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
    resetAuthData: (state) => {
      state.authData = {}
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
    setproFileData: (state, { payload }) => {
      state.profileData = payload
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
  setproFileData,
  resetAuthData,
} = AuthSlice.actions

export default AuthSlice.reducer

export const currentUserData = (state) => state.authSlice.loginData

export const selectOnBordingData = (state) => state.authSlice.onboardingData

export const selectIsAuthenticated = (state) => !!state.authSlice.loginData?.id

export const selectIsFirstVisit = (state) => state.authSlice.loginData?.firstVisit === 1

export const userDetail = (state) => state.authSlice.profileData

export const selectIsApproved = (state) => state.authSlice?.loginData?.userStatus === 'approved'

export const selectIsRejected = (state) => state.authSlice?.loginData?.userStatus === 'rejected'

export const selectIsPending = createDraftSafeSelector(
  [selectIsApproved, selectIsRejected],
  (approved, rejected) => !approved && !rejected
)
