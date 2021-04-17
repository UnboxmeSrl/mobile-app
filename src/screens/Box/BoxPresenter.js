import React from 'react'
import styled from 'styled-components/native'

import { ActiveStep } from '@components/ActiveStep'
import { BackArrow } from '@components/BackArrow'
import { ModalContainer } from '@components/ModalContainer'
import { WizardStep } from '@components/WizardStep'

export const BoxPresenter = ({ navigateToNextStep, navigateToPrevStep, stepIndex, steps, hiddenArrow }) => (
  <ModalContainer noPaddingTop>
    <Content>
      <Header>
        <BackArrow hidden={hiddenArrow} noBack onPress={navigateToPrevStep} />
        <ActiveStep currentStepIndex={stepIndex} steps={steps} />
      </Header>
      <WizardStep navigateToNextStep={navigateToNextStep} stepIndex={stepIndex} steps={steps} />
    </Content>
  </ModalContainer>
)

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Content = styled.View`
  flex: 1;
  padding-bottom: 20px;
  padding-horizontal: 20px;
`
