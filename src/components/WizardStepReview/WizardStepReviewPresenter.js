import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { BigLight } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS, GENDER_OPTIONS } from '@const'
import { PHONE_RULES, REQUIRED_RULE } from '@const/validators'

export const WizardStepReviewPresenter = ({ openInstagram }) => {
  return (
    <StepContent>
      <Wrapper>
        <Text tKey={'review.inReview'} />
      </Wrapper>
      <Button
        light
        onPress={openInstagram}
        rightIconName={'logo-instagram'}
        tKey={'followUs'}
      />
    </StepContent>
  )
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
`
const Text = styled(BigLight)`
  font-size: 24px;
  letter-spacing: 1px;
  line-height: 36px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
`
