import React, { createRef, useEffect, useRef, useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import { prop } from 'ramda'
import styled from 'styled-components/native'
import { selectIsAuthenticated, selectIsAuthInitialized } from '@redux/modules/auth'
import { navigate } from '@services'
import { setLoginData } from '../../redux/slices'
import { SCREEN_NAMES } from '../../constants/navigation'
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
  const authInitialized = useSelector(selectIsAuthInitialized)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()

  const isApplied = useSelector((state) => state.authSlice.isApplied)
  const isSignUpProcessStarted = useSelector((state) => state.authSlice.isSignUpProcessStarted)
  const signUpProcessStage = useSelector((state) => state.authSlice.signUpProcessStage)

  useEffect(() => {
    /* TODO: when you complete your every changes uncomment below code:
     because this isApplied is to know that user has signed up & is waiting for approval from admin */

    // dispatch(setLoginData({}))

    if (isApplied) {
      navigate(SCREEN_NAMES.AppliedScreen)
    } else if (isSignUpProcessStarted) {
      checkSignUpProgress(signUpProcessStage)
    } else {
      navigate(SCREEN_NAMES.OnboardingNew)
    }

    setTimeout(() => {
      SplashScreen.hide()
      ref?.current?.play(0, 120)
      setTimeout(() => {
        setFadeOut(true)
      }, delay)
    }, 0)
  }, [ref, authInitialized, isAuthenticated, show])

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
