import React from 'react'
import { AppleLogin } from '../../components/AppleLogin'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const LoginScreen: React.FC = () => (
  <Container>
    <AppleLogin />
  </Container>
)
