import React from 'react'
import { Animated } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import { prop } from 'ramda'
import styled from 'styled-components/native'

import { Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

const SIZE = (screenWidth - 80) / 2
export const UploadPlaceholderPresenter = ({ onPress, thumb, isComplete, progress, height }) => {
  return (
    <Placeholder disabled={isComplete} onPress={onPress}>
      {thumb && <StyledPlayer isComplete={isComplete} muted resizeMode={'cover'} source={{ uri: thumb }} />}
      {!thumb && <Ionicons color={COLORS.white} name={'add-outline'} size={SIZE / 2} />}
      {isComplete && <Overlay />}
      {isComplete && <Ionicons color={COLORS.white} name={'checkmark-outline'} size={SIZE / 2} />}
      {thumb && !isComplete && <Progress style={{ height }} />}
    </Placeholder>
  )
}
const Progress = styled(Animated.View)`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: ${SIZE}px;
`
const Overlay = styled.View`
  background-color: black;
  border-radius: 20px;
  height: ${SIZE}px;
  opacity: 0.1;
  position: absolute;
  width: ${SIZE}px;
`
const Placeholder = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  height: ${SIZE}px;
  justify-content: center;
  margin: 7.5px;
  width: ${SIZE}px;
`

const StyledPlayer = styled(Video)`
  border-radius: 20px;
  height: ${SIZE}px;
  opacity: ${({ isComplete }) => (isComplete ? 0.8 : 0.3)};
  position: absolute;
  width: ${SIZE}px;
`
