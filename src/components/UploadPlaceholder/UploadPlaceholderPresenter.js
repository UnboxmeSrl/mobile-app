import React from 'react'
import { ActivityIndicator, Animated } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import { prop } from 'ramda'
import styled from 'styled-components/native'

import { Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

const SIZE = (screenWidth - 80) / 2
export const UploadPlaceholderPresenter = ({
  onPress,
  file,
  isCompleted,
  progress,
  height,
  onRemove,
  publicUrl,
  fromStorage,
}) => {
  return (
    <Placeholder disabled={isCompleted} onPress={onPress}>
      {file && <StyledPlayer isCompleted={isCompleted} muted resizeMode={'cover'} source={{ uri: file?.uri }} />}
      {publicUrl && (
        <>
          <Loader />
          <StyledPlayer
            isCompleted={isCompleted || fromStorage}
            muted
            resizeMode={'cover'}
            source={{ uri: publicUrl }}
          />
        </>
      )}
      {!file && !fromStorage && <Ionicons color={COLORS.white} name={'add-outline'} size={SIZE / 2} />}
      {isCompleted && <Overlay />}
      {isCompleted && <Ionicons color={COLORS.white} name={'checkmark-outline'} size={SIZE / 2} />}
      {(isCompleted || fromStorage) && (
        <TrashWrapper onPress={onRemove}>
          <Ionicons color={COLORS.white} name={'trash-outline'} size={20} />
        </TrashWrapper>
      )}
      {file && !isCompleted && <Progress style={{ height }} />}
    </Placeholder>
  )
}

const Loader = styled.ActivityIndicator``
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
const TrashWrapper = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.primary};
  border-radius: 8px;
  height: 30px;
  justify-content: center;
  position: absolute;
  right: -4px;
  top: -4px;
  width: 30px;
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
  opacity: ${({ isCompleted }) => (isCompleted ? 0.8 : 0.3)};
  position: absolute;
  width: ${SIZE}px;
`
