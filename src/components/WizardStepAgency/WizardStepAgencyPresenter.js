import React from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { SelectCheckbox } from '@components/SelectCheckbox'
import { FREELANCE_TYPES } from '@const/agency'
import { REQUIRED_RULE } from '@const/validators'
import { _agencyName, _city, _isAgency } from '@redux/modules/auth'

export const WizardStepAgencyPresenter = ({ control, errors, onPress }) => {
  return (
    <StepContent>
      <Controller
        control={control}
        defaultValue={false}
        name={_isAgency}
        render={({ onChange, value }) => (
          <Select
            Component={SelectCheckbox}
            defaultValue={value}
            onChange={onChange}
            options={FREELANCE_TYPES}
          />
        )}
      />
      <Input
        autoFocus
        control={control}
        errors={errors}
        name={_agencyName}
        placeholderKey="placeholders.agency"
        rules={REQUIRED_RULE}
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}

const StepContent = styled.View``
