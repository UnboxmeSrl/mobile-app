import React, { createRef, useEffect, useState, useRef } from 'react'
import LottieView from 'lottie-react-native'
import SplashScreen from 'react-native-splash-screen'
import styled from 'styled-components/native'
import { Dimensions, useWindowDimensions, Animated } from 'react-native'
import { prop } from 'ramda'

const Wrapper = styled(Animated.View)`
  width: ${prop('width')}
  height: ${prop('height')}
  position: absolute
  backgroundColor: black
`

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
      }, 4200)
    }, 0)
  }, [])

  useEffect(() => {
    if(fadeOut) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
        }
      ).start(() => {
        setShow(false)
      });
    }
  }, [fadeOut, fadeAnim])

  if (!show) {
    return null
  }
  return (
    <Wrapper
      width={windowWidth}
      height={windowHeight}
      style={{ opacity: fadeAnim }}>
      <LottieView ref={ref} source={require('src/assets/splash.json')} />
    </Wrapper>
  )
}
