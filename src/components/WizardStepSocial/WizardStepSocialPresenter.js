import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'

export const WizardStepSocialPresenter = ({ onPress, navigateTikTokModal }) => {
  return (
    <StepContent>
      <Button onPress={navigateTikTokModal} tKey={'connectTikTok'} />
      <Button onPress={navigateTikTokModal} tKey={'connectInstagram'} />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}

const StepContent = styled.View``
