import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { COLORS, GENDER_OPTIONS } from '@const'
import { PHONE_RULES, REQUIRED_RULE } from '@const/validators'

export const WizardStepGenderPresenter = ({
  control,
  errors,
  onPress,
  isSelected,
  defaultValue,
}) => {
  return (
    <StepContent>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={'gender'}
        render={({ onChange, value }) => (
          <Select defaultValue={value} onChange={onChange} options={GENDER_OPTIONS} />
        )}
      />
      <Button disabled={!isSelected} onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}

const StepContent = styled.View``
