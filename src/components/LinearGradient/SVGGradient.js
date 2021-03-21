import React from 'react'
import { processColor } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

const getAlpha = (color) => (processColor(color) >>> 24) / 0xff

const makeGradientConfig = (colors, locations) => {
  if (colors.length !== locations.length) {
    return null
  }

  return colors.map((color, index) => (
    <Stop
      key={index}
      offset={locations[index]}
      stopColor={color}
      stopOpacity={getAlpha(color)}
    />
  ))
}

const Content = styled.View`
  width: 100%
  position: absolute
`

const Container = styled.View``

const SVGGradient = ({
  start: { x: x1, y: y1 },
  stop: { x: x2, y: y2 },
  pointerEvents,
  locations,
  children,
  colors,
  contentStyle,
  borderRadius,
  ...props
}) => {
  const Gradient = (
    <Svg pointerEvents={pointerEvents} {...props}>
      <Defs>
        <LinearGradient id="Gradient" x1={x1} x2={x2} y1={y1} y2={y2}>
          {makeGradientConfig(colors, locations)}
        </LinearGradient>
      </Defs>
      <Rect
        fill="url(#Gradient)"
        height="100%"
        rx={borderRadius}
        ry={borderRadius}
        width="100%"
      />
    </Svg>
  )

  if (!children) {
    return Gradient
  } else {
    return (
      <Container style={props.style}>
        {Gradient}
        <Content style={contentStyle}>{children}</Content>
      </Container>
    )
  }
}

export default SVGGradient
