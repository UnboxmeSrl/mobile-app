import React from 'react'
import styled from 'styled-components/native'

import { RouteContainer } from '@components/RouteContainer'
import { WizardStepCode } from '@components/WizardStepCode'

export const CodeFromFriendPresenter = ({ navigateToNextStep }) => (
  <RouteContainer tKey={'inviteFriend.haveACode'} withArrow withPadding>
    <Content>
      <WizardStepCode navigateToNextStep={navigateToNextStep} />
    </Content>
  </RouteContainer>
)

const Content = styled.View`
  flex: 1;
  margin: 16px 0;
`
