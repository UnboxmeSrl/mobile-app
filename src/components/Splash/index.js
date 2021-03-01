import React, { createRef, useEffect, useRef, useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import LottieView from 'lottie-react-native'
import { prop } from 'ramda'
import styled from 'styled-components/native'

const Wrapper = styled(Animated.View)`
  width: ${prop('width')}px
  height: ${prop('height')}px
  position: absolute
  background-color: white
`
const delay = __DEV__ ? 1000 : 4200

export const Splash = () => {
  const windowWidth = useWindowDimensions().width
  const windowHeight = useWindowDimensions().height
  const [fadeOut, setFadeOut] = useState(false)
  const [show, setShow] = useState(true)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const ref = createRef()

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
      ref?.current?.play(0, 120)
      setTimeout(() => {
        setFadeOut(true)
      }, delay)
    }, 0)
  }, [])

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
