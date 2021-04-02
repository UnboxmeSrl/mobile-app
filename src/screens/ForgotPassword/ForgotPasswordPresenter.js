import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'
import { PasswordInput } from '@components/PasswordInput'
import { BodyText, Caption, Text } from '@components/Text'
import { EMAIL_RULES_LOGIN, PASSWORD_RULES } from '@const/validators'

export const ForgotPasswordPresenter = ({ onPress, control, errors, loading }) => (
  <ModalContainer contentBased tKey={'signIn.forgot'}>
    <Content>
      <Form>
        <TextStyled tKey={'signIn.pleaseEnter'} />
        <Input
          autoCapitalize="none"
          autoCompleteType="email"
          autoFocus
          control={control}
          errors={errors}
          keyboardType="email-address"
          name="email"
          placeholderKey="signUp.enterEmail"
          rules={EMAIL_RULES_LOGIN}
          textContentType="emailAddress"
        />
      </Form>
      <SubmitButton loading={loading} onPress={onPress} tKey={'resetPassword'} />
    </Content>
  </ModalContainer>
)

const Content = styled.ScrollView`
  padding-bottom: 20px;
  padding-horizontal: 20px;
  padding-top: 20px;
`
const SubmitButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 20px;
  margin-top: 20px;
`
const TextStyled = styled(BodyText)`
  margin-bottom: 8px;
`
