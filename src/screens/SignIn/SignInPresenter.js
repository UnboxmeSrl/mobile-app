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

export const SignInPresenter = ({
  navigateToEmailModal,
  navigateToPhoneModal,
  onSuccess,
  loading,
  setLoading,
}) => (
  <RouteContainer tKey={'otherSignInOptions.title'} withArrow withPadding>
    <Header>
      <Body tKey={'signIn.getPersonalized'} />
    </Header>
    <Buttons>
      <AppleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <FacebookLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <GoogleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <OrLogInText color={COLORS.dark} tKey={'signIn.orLogIn'} />
      <Button
        loading={loading}
        onPress={navigateToEmailModal}
        tKey={'signIn.withEmail'}
      />
      <Button
        loading={loading}
        onPress={navigateToPhoneModal}
        tKey={'signIn.withPhone'}
      />
    </Buttons>
    <PoliciesPart dark />
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
