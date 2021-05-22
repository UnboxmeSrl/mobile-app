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
  navigateToQuestionnaire,
  navigateToAddresses,
  navigateToYourRating,
}) => (
  <Container tKey={'settings'} withPadding>
    <Button onPress={navigateToOnboarding} tKey={'onboardingTitle'} />
    <Button onPress={navigateToAddresses} tKey={'addresses.title'} />
    <Button onPress={navigateToYourRating} tKey={'Your Rating'} />
    {isAuthenticated ? <Button onPress={navigateToQuestionnaire} tKey={'questionnaire.title'} /> : null}
    {isAuthenticated ? <Button onPress={onPress} tKey={'logout'} /> : <LoginGuest />}
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
  justify-content: flex-end;
`
