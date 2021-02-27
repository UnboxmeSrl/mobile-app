import React from 'react'
import styled from 'styled-components/native'

import { Input } from '@components/Input'
import { ModalContainer } from '@components/ModalContainer'

export const SignUpEmailPresenter = ({ onPress, control }) => (
  <ModalContainer tKey={'signUp.withEmail'}>
    <Content>
      <Input autoFocus control={control} name={'email'} placeholderKey={'signUp.enterEmail'} />
    </Content>
  </ModalContainer>
)

const Content = styled.View``
