import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'

export const SettingsScreenPresenter = ({
  onPress,
  isAuthenticated,
  navigateToOnboarding,
  navigateToLogin,
}) => (
  <Container tKey={'settings'} withPadding>
    <Button onPress={navigateToOnboarding} tKey={'onboardingTitle'} />

    {isAuthenticated ? <Button onPress={onPress} tKey={'logout'} /> : <LoginGuest />}
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
  justify-content: flex-end;
`
