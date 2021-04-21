import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Select } from '@components/Select'
import { SelectItem } from '@components/SelectItem'
import { StepContent } from '@components/WizardStep'
import { screenWidth } from '@const/common'
import { SKIN_OPTIONS } from '@const/skin'

export const QuestionnaireStepSkinPresenter = ({ control, onPress, field, defaultValue, image }) => {
  return (
    <StepContent>
      <Image resizeMode={'contain'} source={image} />
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={field}
        render={({ onChange, value }) => (
          <SelectStyled Component={SelectComponent} defaultValue={value} onChange={onChange} options={SKIN_OPTIONS} />
        )}
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
const SelectComponent = styled(SelectItem)`
  flex: 0 0 21%;
  min-width: ${screenWidth / 3.5}px; /* explanation below */
`
const SelectStyled = styled(Select)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Image = styled(FastImage)`
  flex: 1;
  margin-bottom: 24px;
`
