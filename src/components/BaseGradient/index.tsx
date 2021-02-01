import React, { memo } from 'react'
import { prop, propOr } from 'ramda'
import styled from 'styled-components/native'
import LinearGradient from 'src/components/LinearGradient'
import { TOP_GRADIENT_START, TOP_GRADIENT_STOP } from './constants'
import { useWindowDimensions } from 'react-native'

const Base = styled(LinearGradient)`
  width: 100%
  position: absolute
  height:
    ${(props) =>
      prop('height', props) || propOr(0, 'screenHeight', props) * 0.12}px
`
const TopGradient = styled(Base)`
  top: 0;
`
const BottomGradient = styled(Base)`
  bottom: 0;
`

const BaseGradient = ({ style, top, height, colors }) => {
  const screenHeight = useWindowDimensions().height

  if (top) {
    return (
      <TopGradient
        style={style}
        start={TOP_GRADIENT_START}
        stop={TOP_GRADIENT_STOP}
        height={height}
        screenHeight={screenHeight}
      />
    )
  } else {
    return (
      <BottomGradient
        style={style}
        height={height}
        colors={colors}
        screenHeight={screenHeight}
      />
    )
  }
}

export default memo(BaseGradient)
