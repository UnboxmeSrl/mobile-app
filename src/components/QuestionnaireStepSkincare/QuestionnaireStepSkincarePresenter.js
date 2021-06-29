import React from 'react'
import { Controller } from 'react-hook-form'

import { Button } from '@components/Button'
import { Select } from '@components/Select'
import { StepContent } from '@components/WizardStep'
import { YES_NO_OPTIONS } from '@const/common'

export const QuestionnaireStepSkincarePresenter = ({ control, onPress, defaultValue, hasValue, field }) => {
  return (
    <StepContent>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={field}
        render={({ onChange, value }) => <Select defaultValue={value} onChange={onChange} options={YES_NO_OPTIONS} />}
      />
      <Button disabled={!hasValue} onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
