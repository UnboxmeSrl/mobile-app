import React from 'react'
import styled from 'styled-components/native'

import { COLORS } from '@const'

export const Rating = ({ rating = 0, maxRating = 5 }) => {
  const restDots = maxRating - rating
  const activeArray = Array(rating).fill()
  const restArray = Array(restDots).fill()
  return (
    <Container>
      {activeArray.map((index) => (
        <Dot active key={index} />
      ))}
      {restArray.map((index) => (
        <Dot key={index} />
      ))}
    </Container>
  )
}
const Container = styled.View`
  flex-direction: row;
  margin: 4px 0;
`
const Dot = styled.View`
  background-color: ${COLORS.primary};
  border-radius: 20px;
  height: 20px;
  margin-right: 8px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  width: 20px;
`
