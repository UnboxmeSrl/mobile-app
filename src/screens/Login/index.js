import React from 'react'
import styled from 'styled-components/native'

import { AppleLogin } from '@components/Auth/AppleLogin'
import { FacebookLogin } from '@components/Auth/FacebookLogin'
import { GoogleLogin } from '@components/Auth/GoogleLogin'
import { Container } from '@components/RouteContainer'

const Test = styled.View`
  flex: 1
  background-color: green
`
export const LoginScreen = () => {
  return (
    <Test>
      <AppleLogin />
      <FacebookLogin />
      <GoogleLogin />
    </Test>
  )
}
