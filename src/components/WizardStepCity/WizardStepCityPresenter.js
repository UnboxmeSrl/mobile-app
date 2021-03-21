import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { StepContent } from '@components/WizardStep'
import { REQUIRED_RULE } from '@const/validators'
import { _city } from '@redux/modules/auth'

export const WizardStepCityPresenter = ({ control, errors, onPress }) => {
  return (
    <StepContent>
      <Form>
        <Input
          autoFocus
          control={control}
          errors={errors}
          name={_city}
          placeholderKey="placeholders.city"
          rules={REQUIRED_RULE}
          textContentType="addressCity"
        />
      </Form>
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
