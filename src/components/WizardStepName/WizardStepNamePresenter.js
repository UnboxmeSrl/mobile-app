import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { PHONE_RULES, REQUIRED_RULE } from '@const/validators'

export const WizardStepNamePresenter = ({ control, errors, onPress }) => {
  return (
    <StepContent>
      <Input
        autoCapitalize="words"
        autoCompleteType="name"
        autoFocus
        control={control}
        errors={errors}
        name="name"
        placeholderKey="placeholders.name"
        rules={REQUIRED_RULE}
        textContentType="name"
      />
      <Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        name="username"
        placeholderKey="placeholders.nickname"
        rules={REQUIRED_RULE}
        textContentType="username"
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}

const StepContent = styled.View``
