import React from 'react'
import styled from 'styled-components/native'

import { BackArrow } from '@components/BackArrow'
import { Content } from '@components/Content'
import { ProgressBar } from '@components/ProgressBar'
import { WizardStep } from '@components/WizardStep'

export const WizardPresenter = ({
  navigateToNextStep,
  navigateToPrevStep,
  stepIndex,
  steps,
  hiddenArrow,
}) => (
  <Wrapper>
    <Header>
      <BackArrow hidden={hiddenArrow} noBack onPress={navigateToPrevStep} />
      <ProgressBar currentStepIndex={stepIndex} stepsLength={steps.length} />
    </Header>
    <WizardStep
      navigateToNextStep={navigateToNextStep}
      stepIndex={stepIndex}
      steps={steps}
    />
  </Wrapper>
)

const Wrapper = styled(Content)`
  flex: 1;
`
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
