import React from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { SelectCheckbox } from '@components/SelectCheckbox'
import { StepContent } from '@components/WizardStep'
import { FREELANCE_TYPES } from '@const/agency'
import { REQUIRED_RULE } from '@const/validators'
import { _agencyName, _hasAgency } from '@redux/modules/auth'

export const WizardStepAgencyPresenter = ({
  control,
  errors,
  onPress,
  isAgencyValue,
}) => {
  return (
    <StepContent>
      <Form>
        <Controller
          control={control}
          defaultValue={false}
          name={_hasAgency}
          render={({ onChange, value }) => (
            <Select
              Component={SelectCheckbox}
              defaultValue={value}
              onChange={onChange}
              options={FREELANCE_TYPES}
            />
          )}
        />
        {isAgencyValue ? (
          <Input
            autoFocus
            control={control}
            errors={errors}
            name={_agencyName}
            placeholderKey="placeholders.agency"
            rules={REQUIRED_RULE}
          />
        ) : null}
      </Form>
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
