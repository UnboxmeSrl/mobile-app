import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { COLORS } from '@const'

export const ActiveStepPresenter = ({ currentStepIndex, steps }) => (
  <Wrapper>
    {steps.map((item, index) => (
      <Dot active={currentStepIndex === index + 1} />
    ))}
  </Wrapper>
)

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
`
const Dot = styled.View`
  background-color: ${({ active }) => (active ? COLORS.secondary : COLORS.tertiary)};
  border-radius: 6px;
  height: 12px;
  margin-left: 4px;
  width: 12px;
`
