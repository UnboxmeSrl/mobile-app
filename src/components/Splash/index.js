import React, { createRef, useEffect, useRef, useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useSelector } from 'react-redux'
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
} from '../../redux/slices/authSlice'
import { checkSignUpProgress } from '../../utils'

const Wrapper = styled(Animated.View)`
  width: ${prop('width')}px
  height: ${prop('height')}px
  position: absolute
  background-color: white
`
const delay = 500

export const Splash = () => {
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
  useEffect(() => {
    if (!hideOnBoarding) {
      navigate(SCREEN_NAMES.OnboardingNew)
    } else if (isAuthenticated && isApplied) {
      navigate(STACK_NAMES.AppliedScreen)
    } else if (isAuthenticated && firstVisit && approvedUser) {
      navigate(STACK_NAMES.FirstWelcomeScreen)
    } else if (isAuthenticated && approvedUser) {
      navigate(STACK_NAMES.BottomStack)
    } else if (rejectedUser && isAuthenticated) {
      navigate(STACK_NAMES.RejectedScreen)
    } else if (isSignUpProcessStarted) {
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

  if (!show) {
    return null
  }
  return (
    <Wrapper height={windowHeight} style={{ opacity: fadeAnim }} width={windowWidth}>
      {/* <LottieView ref={ref} source={require('src/assets/splash.json')} /> */}
    </Wrapper>
  )
}
