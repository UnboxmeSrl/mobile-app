import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'

export const AuthPhonePresenter = ({
  onPress,
  control,
  errors,
  loading,
  showCodeInput,
}) => (
  <ModalContainer tKey={'auth.withPhone'}>
    <Content>
      <Input
        autoCompleteType="tel"
        autoFocus
        control={control}
        errors={errors}
        keyboardType="phone-pad"
        name="phone"
        placeholderKey="auth.enterPhone"
        textContentType="telephoneNumber"
      />
      {showCodeInput ? (
        <Input
          autoCompleteType="off"
          control={control}
          errors={errors}
          keyboardType="number-pad"
          name="code"
          placeholderKey="auth.enterCode"
          textContentType="oneTimeCode"
        />
      ) : null}
      <SubmitButton loading={loading} onPress={onPress} tKey={'next'} />
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
  margin-top: 60px;
`
