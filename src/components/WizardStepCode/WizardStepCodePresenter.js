import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { InputCode } from '@components/InputCode'
import { StepContent } from '@components/WizardStep'
import { REQUIRED_RULE } from '@const/validators'
import { _wizardCode } from '@redux/modules/auth'

export const WizardStepCodePresenter = ({ control, errors, onPress, buttonTKey }) => {
  return (
    <StepContent>
      <Form>
        <InputCode
          control={control}
          errors={errors}
          name={_wizardCode}
          returnKeyType={'submit'}
        />
      </Form>
      <Button onPress={onPress} tKey={buttonTKey} />
    </StepContent>
  )
}
