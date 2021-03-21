import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import InputDate from '@components/InputDate'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'
import { REQUIRED_RULE } from '@const/validators'
import { _dobTs } from '@redux/modules/auth'

export const WizardStepDateOfBirthPresenter = ({
  control,
  errors,
  onPress,
  value,
  onChange,
}) => {
  return (
    <StepContent>
      <InputDate
        RightIcon={<Ionicons color={COLORS.black} name={'calendar-outline'} size={24} />}
        control={control}
        defaultValue={value}
        errors={errors}
        name={_dobTs}
        onChange={onChange}
        placeholderKey="placeholders.dateOfBirth"
        rules={REQUIRED_RULE}
        textContentType="name"
        value={value}
      />
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
