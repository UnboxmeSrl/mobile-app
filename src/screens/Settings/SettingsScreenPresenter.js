import React  from 'react'

import { Button } from '@components/Button'
import { Container } from '@components/RouteContainer'
import { Body } from '@components/Text'

export const SettingsScreenPresenter = ({ onPress }) => (
  <Container tKey={'settings'}>
    <Button onPress={onPress}>
      <Body>Log out</Body>
    </Button>
  </Container>
)
