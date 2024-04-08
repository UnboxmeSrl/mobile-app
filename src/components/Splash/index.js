import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import { prop } from 'ramda'
import styled from 'styled-components/native'

// import { selectIsAuthenticated, selectIsAuthInitialized } from '@redux/modules/auth'
import { navigate } from '@services'

import { SCREEN_NAMES, STACK_NAMES } from '../../constants/navigation'
import {
  selectIsApproved,
  selectIsAuthenticated,
  selectIsFirstVisit,
  selectIsPending,
  selectIsRejected,
  selectOnBordingData,
  updateLoginData,
} from '../../redux/slices/authSlice'
import { getAllActions, getProfile } from '../../services'
import { checkSignUpProgress } from '../../utils'
import { setSocialActions } from '../../redux/slices'

const Wrapper = styled(Animated.View)`
  width: ${prop('width')}px
  height: ${prop('height')}px
  position: absolute
  background-color: white
`
const delay = 500

export const Splash = () => {
  const dispatch = useDispatch()
  const windowWidth = useWindowDimensions().width
  const windowHeight = useWindowDimensions().height
  const [fadeOut, setFadeOut] = useState(false)
  const [show, setShow] = useState(true)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const ref = createRef()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const hideOnBoarding = useSelector(selectOnBordingData)

  const isApplied = useSelector(selectIsPending)
  const rejectedUser = useSelector(selectIsRejected)
  const approvedUser = useSelector(selectIsApproved)
  const firstVisit = useSelector(selectIsFirstVisit)
  const isSignUpProcessStarted = useSelector((state) => state.authSlice.isSignUpProcessStarted)
  const signUpProcessStage = useSelector((state) => state.authSlice.signUpProcessStage)
  const LoginDetail = useSelector((state) => state.authSlice.loginData)
  /* const authData = useSelector((state) => state.authSlice.authData) */
  // console.log(
  //   'isAuthenticated',
  //   isAuthenticated,
  //   hideOnBoarding,
  //   isApplied,
  //   rejectedUser,
  //   approvedUser,
  //   firstVisit,
  //   isSignUpProcessStarted,
  //   signUpProcessStage
  // )

  const handleGetProfileData = useCallback(async () => {
    const res = await getProfile()
    dispatch(updateLoginData(res))
  }, [dispatch])

  const getAllSocialActions = async () => {
    const res = await getAllActions()
    dispatch(setSocialActions(res))
  }

  useEffect(() => {
    if (LoginDetail && (LoginDetail?.UserStatus === '' || LoginDetail?.UserStatus === 'onapproval')) {
      const timeout = setTimeout(() => {
        handleGetProfileData()
        // will call after every 2 minutes
      }, 1000 * 60 * 2)
      return () => {
        if (timeout) clearTimeout(timeout)
      }
    }
  }, [handleGetProfileData, LoginDetail])
  /* console.log('userStatus details', signUpProcessStage, approvedUser, firstVisit, LoginDetail) */
  useEffect(() => {
    if (!hideOnBoarding) {
      console.log('hideOnBoarding')
      navigate(SCREEN_NAMES.OnboardingNew)
    } else if (isAuthenticated && isApplied) {
      console.log('isApplied')
      navigate(SCREEN_NAMES.AppliedScreen)
    } else if (isAuthenticated && firstVisit && approvedUser) {
      console.log('firstVisit')
      navigate(SCREEN_NAMES.FirstWelcomeScreen)
    } else if (isAuthenticated && approvedUser) {
      console.log('approvedUser')
      navigate(STACK_NAMES.BottomStack)
    } else if (rejectedUser && isAuthenticated) {
      console.log('rejectedUser')
      navigate(SCREEN_NAMES.RejectedScreen)
    } else if (isSignUpProcessStarted) {
      console.log('isSignUpProcessStarted')
      checkSignUpProgress(signUpProcessStage)
    } else {
      navigate(SCREEN_NAMES.SignUpNew)
    }
  }, [
    hideOnBoarding,
    isAuthenticated,
    isApplied,
    approvedUser,
    isSignUpProcessStarted,
    signUpProcessStage,
    firstVisit,
    rejectedUser,
  ])
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
      ref?.current?.play(0, 120)
      setTimeout(() => {
        setFadeOut(true)
      }, delay)
    }, 0)
  }, [ref])

  useEffect(() => {
    if (fadeOut) {
      Animated.timing(fadeAnim, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setShow(false)
      })
    }
  }, [fadeOut, fadeAnim])

  useEffect(() => {
    getAllSocialActions()
  }, [])

  if (!show) {
    return null
  }
  return (
    <Wrapper height={windowHeight} style={{ opacity: fadeAnim }} width={windowWidth}>
      {/* <LottieView ref={ref} source={require('src/assets/splash.json')} /> */}
    </Wrapper>
  )
}
