import React from 'react'
import styled from 'styled-components/native'

import { Instagram } from '@components/Auth/Instagram'
import { Button } from '@components/Button'
import { StepContent } from '@components/WizardStep'

export const WizardStepSocialPresenter = ({ onPress, navigateTikTokModal }) => {
  return (
    <StepContent>
      <Button onPress={navigateTikTokModal} tKey={'connectTikTok'} />
      {/* <Instagram tKey={'connectInstagram'} /> */}
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
