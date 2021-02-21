import React, { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { prop, propOr } from 'ramda'
import LinearGradient from 'src/components/LinearGradient'
import styled from 'styled-components/native'

import { TOP_GRADIENT_START, TOP_GRADIENT_STOP } from './constants'

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
        height={height}
        screenHeight={screenHeight}
        start={TOP_GRADIENT_START}
        stop={TOP_GRADIENT_STOP}
        style={style}
      />
    )
  } else {
    return (
      <BottomGradient
        colors={colors}
        height={height}
        screenHeight={screenHeight}
        style={style}
      />
    )
  }
}

export default memo(BaseGradient)
