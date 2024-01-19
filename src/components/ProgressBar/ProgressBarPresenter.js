import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { Caption } from '@components/Text'
import { COLORS } from '@const'

const BUTTON_SIZE = 48

export const ProgressBarPresenter = ({ width, currentStepIndex, stepsLength }) => (
  <Wrapper>
    <ProgressWrapper>
      <ProgressLine as={Animated.View} style={{ width }} />
    </ProgressWrapper>
    <Text>
      {currentStepIndex}/{stepsLength}
    </Text>
  </Wrapper>
)

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
`
const ProgressWrapper = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 8px;
  height: 8px;
  justify-content: center;
  margin-right: 12px;
  padding: 1px;
  width: 132px;
`
const ProgressLine = styled.View`
  background-color: ${COLORS.primary};
  border-radius: 6px;
  height: 6px;
`
const Text = styled(Caption)`
  text-align: right;
  width: 30px;
  }
`

// export const ProgressBarPresenter = ({ width, currentStepIndex, stepsLength }) => (
//   <Wrapper>
//     <ProgressWrapper>
//       <ProgressLine as={Animated.View} style={{ width }} />
//     </ProgressWrapper>
//     <Text>
//       {currentStepIndex}/{stepsLength}
//     </Text>
//   </Wrapper>
// )

// const Wrapper = styled.View`
//   align-items: center;
//   flex-direction: row;
// `
