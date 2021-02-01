import React from 'react'
import Svg, { Defs, Stop, LinearGradient, Rect } from 'react-native-svg'
import { processColor } from 'react-native'
import styled from 'styled-components/native'

const getAlpha = (color) => (processColor(color) >>> 24) / 0xff

const makeGradientConfig = (colors, locations) => {
  if (colors.length !== locations.length) {
    return null
  }

  return colors.map((color, index) => (
    <Stop
      offset={locations[index]}
      stopColor={color}
      stopOpacity={getAlpha(color)}
      key={index}
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
        <LinearGradient id="Gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
          {makeGradientConfig(colors, locations)}
        </LinearGradient>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="url(#Gradient)"
        rx={borderRadius}
        ry={borderRadius}
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
