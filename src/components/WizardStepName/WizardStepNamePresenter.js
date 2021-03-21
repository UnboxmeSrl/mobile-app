import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { StepContent } from '@components/WizardStep'
import { REQUIRED_RULE } from '@const/validators'
import { _fullName, _username } from '@redux/modules/auth'

export const WizardStepNamePresenter = ({ control, errors, onPress }) => {
  return (
    <StepContent>
      <Form>
        <Input
          autoCapitalize="words"
          autoCompleteType="name"
          autoFocus
          control={control}
          errors={errors}
          name={_fullName}
          placeholderKey="placeholders.name"
          returnKeyType={'next'}
          rules={REQUIRED_RULE}
          textContentType="name"
        />
        <Input
          autoCapitalize="none"
          control={control}
          errors={errors}
          name={_username}
          placeholderKey="placeholders.nickname"
          returnKeyType={'send'}
          rules={REQUIRED_RULE}
          textContentType="username"
        />
      </Form>
      <Button onPress={onPress} tKey={'next'} />
    </StepContent>
  )
}
