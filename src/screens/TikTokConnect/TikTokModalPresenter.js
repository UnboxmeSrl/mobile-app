import React from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'
import { BodyText } from '@components/Text'
import { REQUIRED_RULE } from '@const/validators'
import { _tiktokUsername } from '@redux/modules/auth'

export const TikTokModalPresenter = ({ onPress, control, errors, loading }) => (
  <ModalContainer contentBased tKey={'tiktok.title'}>
    <Content>
      <Body tKey={'tiktok.enter'} />
      <Form>
        <Input
          autoCapitalize="none"
          control={control}
          errors={errors}
          name={_tiktokUsername}
          placeholderKey="yourTiktok"
          rules={REQUIRED_RULE}
        />
      </Form>
      <Info tKey={'tiktok.andSendMessage'} />
      <SubmitButton loading={loading} onPress={onPress} tKey={'tiktok.sendMessage'} />
    </Content>
  </ModalContainer>
)

const Content = styled(KeyboardAvoidingView)`
  padding-bottom: 20px;
  padding-horizontal: 20px;
  padding-top: 20px;
`
const SubmitButton = styled(Button)`
  margin-top: 8px;
`
const Body = styled(BodyText)`
  margin-bottom: 16px;
`
const Info = styled(BodyText)`
  margin-bottom: 16px;
  margin-top: 32px;
`
