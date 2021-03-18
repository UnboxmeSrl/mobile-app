import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { REQUIRED_RULE } from '@const/validators'
import { _city } from '@redux/modules/auth'

export const WizardStepCityPresenter = ({ control, errors, onPress }) => {
  return (
    <StepContent>
      <Input
        autoFocus
        control={control}
        errors={errors}
        name={_city}
        placeholderKey="placeholders.city"
        rules={REQUIRED_RULE}
        textContentType="addressCity"
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}

const StepContent = styled.View``
