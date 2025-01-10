import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  authData: {},
  isApplied: false,
  isFirstTimeLogin: true,
  isSignUpProcessStarted: false,
  loginData: {},
  onboardingData: false,
  profileData: {},
  signUpProcessStage: 0,
  visitCount: 1,
  userLocation: null,
};

const AuthSlice = createSlice({
  initialState: {...initialState},
  name: sliceNames.authSlice,
  reducers: {
    resetLogin: state => {
      state.loginData = {};
    },
    setAuthData: (state, actions) => {
      state.authData = {
        ...state.authData,
        ...actions?.payload,
      };
    },
    resetAuthData: state => ({
      ...initialState,
      onboardingData: state.onboardingData,
    }),
    setLoginData: (state, actions) => {
      state.loginData = actions?.payload;
    },
    updateLoginData: (state, actions) => {
      if (state.loginData?.id) {
        state.loginData = {...state.loginData, ...actions?.payload};
      }
    },
    setIsApplied: (state, actions) => {
      state.isApplied = actions?.payload;
    },
    setOnboardingData: (state, {payload}) => {
      state.onboardingData = payload;
    },
    setIsFirstTimeLogin: (state, actions) => {
      state.isFirstTimeLogin = actions?.payload;
    },
    setIsSignUpProcessStarted: (state, actions) => {
      state.isSignUpProcessStarted = actions?.payload;
    },
    setSignUpProcessStage: (state, actions) => {
      state.signUpProcessStage = actions?.payload;
    },
    setproFileData: (state, {payload}) => {
      state.profileData = payload;
    },
    setVisitCount: state => {
      state.visitCount += 1;
    },
    updateUserCount: (state, {payload}) => {
      if (payload && state.loginData?.id) {
        state.loginData.firstVisit += payload;
      }
    },
    setUserCurrentLocation: (state, {payload}) => {
      state.userLocation = payload;
    },
  },
});

export const {
  resetLogin,
  setAuthData,
  setLoginData,
  setIsApplied,
  setVisitCount,
  setIsFirstTimeLogin,
  setIsSignUpProcessStarted,
  setSignUpProcessStage,
  setOnboardingData,
  setproFileData,
  resetAuthData,
  updateUserCount,
  updateLoginData,
  setUserCurrentLocation,
} = AuthSlice.actions;

export default AuthSlice.reducer;

export const currentUserData = state => state.authSlice.loginData;

export const selectOnBordingData = state => state.authSlice.onboardingData;

export const selectIsAuthenticated = state => !!state.authSlice.loginData?.id;

export const selectIsFirstVisit = state =>
  state.authSlice.loginData?.firstVisit === 1;
// export const selectIsFirstVisit = (state) => state.authSlice.isFirstTimeLogin

export const userDetail = state => state.authSlice.profileData;

export const selectIsApproved = state =>
  state.authSlice?.loginData?.UserStatus === 'approved';

export const selectIsRejected = state =>
  state.authSlice?.loginData?.UserStatus === 'rejected';

export const selectIsPending = createDraftSafeSelector(
  [selectIsApproved, selectIsRejected],
  (approved, rejected) => !approved && !rejected,
);

export const selectVisitCount = state => state.authSlice.visitCount === 1;

export const selecteUserCoords = state => state.authSlice.userLocation;
