import React from 'react'
import SVGGradient from 'src/components/LinearGradient/SVGGradient'
import styled from 'styled-components/native'

import {
  DEFAULT_COLORS,
  DEFAULT_LOCATIONS,
  DEFAULT_START,
  DEFAULT_STOP,
} from './constants'

const Gradient = styled(SVGGradient)`
  width: 100%
  height: 100px
`

const LinearGradient = ({
  colors,
  start,
  stop,
  locations,
  children,
  style,
  borderRadius,
  contentStyle,
  pointerEvents = 'none',
}) => (
  <Gradient
    borderRadius={borderRadius}
    colors={colors}
    contentStyle={contentStyle}
    locations={locations}
    pointerEvents={pointerEvents}
    start={start}
    stop={stop}
    style={style}>
    {children}
  </Gradient>
)

LinearGradient.defaultProps = {
  borderRadius: 0,
  colors: DEFAULT_COLORS,
  contentStyle: {},
  locations: DEFAULT_LOCATIONS,
  start: DEFAULT_START,
  stop: DEFAULT_STOP,
}

export default LinearGradient
