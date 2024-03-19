import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { PHONE_RULES } from '@const/validators'

export const AuthPhonePresenter = ({
  onPress,
  control,
  errors,
  loading,
  showCodeInput,
  tKey,
  codeRules,
  resendCode,
  resendDisabled,
  timer,
}) => (
  <ModalContainer contentBased tKey={tKey}>
    <Content>
      <Input
        autoCompleteType="tel"
        autoFocus
        control={control}
        errors={errors}
        keyboardType="phone-pad"
        name="phone"
        placeholderKey="auth.enterPhone"
        rules={PHONE_RULES}
        textContentType="telephoneNumber"
      />
      <Input
        autoCompleteType="off"
        control={control}
        disabled={!showCodeInput}
        errors={errors}
        keyboardType="number-pad"
        name="code"
        placeholderKey="auth.enterCode"
        rules={codeRules}
        textContentType="oneTimeCode"
      />
      <SubmitButton loading={loading} onPress={onPress} tKey={tKey} />

      {showCodeInput ? (
        <ResendButton
          color={COLORS.dark}
          disabled={resendDisabled}
          extraText={timer}
          onPress={resendCode}
          tKey={'auth.resendCode'}
        />
      ) : null}
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
  margin-top: 8px;
`
const ResendButton = styled(TextButton)``
