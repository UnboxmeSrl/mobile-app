import React from 'react'

import { AppleLogin } from '@components/Auth/AppleLogin'
import { FacebookLogin } from '@components/Auth/FacebookLogin'
import { GoogleLogin } from '@components/Auth/GoogleLogin'
import { Container } from '@components/Container'
import styled from 'styled-components/native'

const Test = styled.View`
  flex: 1
  backgroundColor: green
`
export const LoginScreen: React.FC = () => {
  console.log('LOGIn')
  return (
    <Test>
      <AppleLogin />
      <FacebookLogin />
      <GoogleLogin />
    </Test>
  )
}
