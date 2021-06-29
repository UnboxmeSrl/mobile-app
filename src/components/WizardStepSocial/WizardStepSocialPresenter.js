import React from 'react'
import styled from 'styled-components/native'

import { Instagram } from '@components/Auth/Instagram'
import { Button } from '@components/Button'
import { StepContent } from '@components/WizardStep'

export const WizardStepSocialPresenter = ({
  onPress,
  navigateTikTokModal,
  tiktokUsername,
  disabled,
}) => {
  return (
    <StepContent>
      <ButtonWrapper>
        <Button
          leftIconName={'logo-tiktok'}
          onPress={navigateTikTokModal}
          tKey={tiktokUsername ? 'onValidation' : 'connectTikTok'}
          tOptions={{ username: `@${tiktokUsername}` }}
        />
        <Instagram />
      </ButtonWrapper>
      <Button disabled={disabled} onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
const ButtonWrapper = styled.View``
