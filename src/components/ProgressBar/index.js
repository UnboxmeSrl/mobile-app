import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { ProgressBarPresenter } from './ProgressBarPresenter'

export const WIDTH_ANIMATION_DURATION = 500

export const ProgressBar = ({ currentStepIndex, stepsLength }) => {
  const progress = (currentStepIndex / stepsLength) * 100
  const [animatedValue] = useState(new Animated.Value(progress))

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: WIDTH_ANIMATION_DURATION,
      easing: Easing.linear(),
      toValue: progress,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, progress])

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })

  const props = { currentStepIndex, stepsLength, width }

  return <ProgressBarPresenter {...props} />
}
