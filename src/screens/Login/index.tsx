import React, { useContext } from 'react'
import { AppleLogin } from '@components/Auth/AppleLogin'
import { FacebookLogin } from '@components/Auth/FacebookLogin'
import { GoogleLogin } from '@components/Auth/GoogleLogin'
import { Container } from '@components/Container'

export const LoginScreen: React.FC = () => (
  <Container>
    <AppleLogin />
    <FacebookLogin />
    <GoogleLogin />
  </Container>
)
