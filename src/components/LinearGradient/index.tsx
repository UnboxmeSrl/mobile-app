import React from 'react'
import styled from 'styled-components/native'
import SVGGradient from 'src/components/LinearGradient/SVGGradient'
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
    pointerEvents={pointerEvents}
    start={start}
    stop={stop}
    locations={locations}
    colors={colors}
    style={style}
    borderRadius={borderRadius}
    contentStyle={contentStyle}>
    {children}
  </Gradient>
)

LinearGradient.defaultProps = {
  locations: DEFAULT_LOCATIONS,
  contentStyle: {},
  borderRadius: 0,
  colors: DEFAULT_COLORS,
  start: DEFAULT_START,
  stop: DEFAULT_STOP,
}

export default LinearGradient
