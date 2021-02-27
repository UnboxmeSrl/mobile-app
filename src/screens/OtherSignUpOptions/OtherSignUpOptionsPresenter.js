import React from 'react'
import styled from 'styled-components/native'

import { AppleLogin } from '@components/Auth/AppleLogin'
import { FacebookLogin } from '@components/Auth/FacebookLogin'
import { GoogleLogin } from '@components/Auth/GoogleLogin'
import { Button } from '@components/Button'
import { Policies } from '@components/Policies'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'
import { BoldTextLink } from '@components/TextButton'
import { COLORS } from '@const'

export const OtherSignUpOptionsPresenter = ({ navigateToEmailModal}) => (
  <RouteContainer tKey={'otherSignUpOptions.title'} withArrow withPadding>
      <Header>
        <Body tKey={'signUp.createAccount'} />
      </Header>
      <Buttons>
        <AppleLogin />
        <FacebookLogin />
        <GoogleLogin />
        <OrLogInText color={COLORS.dark} tKey={'signUp.orLogIn'} />
        <Button onPress={navigateToEmailModal} tKey={'signUp.withEmail'}/>
        <Button tKey={'signUp.withPhone'}/>
      </Buttons>
      <PoliciesPart dark/>
  </RouteContainer>
)

const Header = styled.View`
  flex: 0.2;
  justify-content: center;
`
const Body = styled(BodyText)`
  text-align: center;
`
const Buttons = styled.View`
  flex: 0.7;
  justify-content: flex-start;
`
const PoliciesPart = styled(Policies)`
  flex: 0.1;
  justify-content: flex-end;
`
const OrLogInText = styled(BoldTextLink)`
  margin-bottom: 24px;
  margin-top: 24px;
`
