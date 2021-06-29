import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'
import { PasswordInput } from '@components/PasswordInput'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { EMAIL_RULES_LOGIN, PASSWORD_RULES } from '@const/validators'

export const SignInEmailPresenter = ({ onPress, control, errors, loading, navigateToForgot }) => (
  <ModalContainer contentBased tKey={'signIn.withEmail'}>
    <Content>
      <Form>
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
        <PasswordInput
          control={control}
          errors={errors}
          name="password"
          placeholderKey={'signUp.enterPassword'}
          rules={PASSWORD_RULES}
          textContentType="newPassword"
        />
      </Form>
      <SubmitButton loading={loading} onPress={onPress} tKey={'submit'} />

      <TextButton color={COLORS.dark} onPress={navigateToForgot} tKey={'login.forgotPassword'} />
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
