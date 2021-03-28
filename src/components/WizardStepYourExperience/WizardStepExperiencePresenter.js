import React from 'react'
import { Controller } from 'react-hook-form'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Select } from '@components/Select'
import { SelectCheckbox } from '@components/SelectCheckbox'
import { StepContent } from '@components/WizardStep'
import { EXPERIENCE_TYPES } from '@const/experience'
import { _experienceType } from '@redux/modules/auth'

export const WizardStepExperiencePresenter = ({ control, onPress }) => {
  return (
    <StepContent>
      <Form>
        <Controller
          control={control}
          defaultValue={false}
          name={_experienceType}
          render={({ onChange, value }) => (
            <Select
              Component={SelectCheckbox}
              defaultValue={value}
              onChange={onChange}
              options={EXPERIENCE_TYPES}
            />
          )}
        />
      </Form>
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
