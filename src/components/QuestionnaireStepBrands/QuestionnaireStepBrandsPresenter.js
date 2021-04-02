import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Select } from '@components/Select'
import { SelectItem } from '@components/SelectItem'
import { StepContent } from '@components/WizardStep'
import { BRANDS_OPTIONS } from '@const/brands'
import { screenWidth } from '@const/common'
import { SKIN_OPTIONS } from '@const/skin'

export const QuestionnaireStepBrandsPresenter = ({ control, onPress, field, defaultValue }) => {
  return (
    <StepContent>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={field}
        render={({ onChange, value }) => (
          <SelectStyled
            Component={SelectComponent}
            defaultValue={value}
            multi
            onChange={onChange}
            options={BRANDS_OPTIONS}
          />
        )}
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
const SelectComponent = styled(SelectItem)`
  flex: 0 0 45%;
  height: 100px; /* explanation below */
  min-width: ${screenWidth / 2.3}px;
`
const SelectStyled = styled(Select)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`
