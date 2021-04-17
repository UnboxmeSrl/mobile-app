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
  createOrderAction,
}) => (
  <Container tKey={'settings'} withPadding>
    <Button onPress={createOrderAction} tKey={'onboardingTitle'} />
    {isAuthenticated ? <Button onPress={navigateToQuestionnaire} tKey={'questionnaire.title'} /> : null}
    {isAuthenticated ? <Button onPress={onPress} tKey={'logout'} /> : <LoginGuest />}
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
  justify-content: flex-end;
`
