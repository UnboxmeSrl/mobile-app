import React  from 'react'

import { Button } from '@components/Button'
import { Container } from '@components/Container'
import { RegularText } from '@components/Text'

export const SettingsScreenPresenter = ({ onPress }) => (
  <Container tKey={'settings'}>
    <Button onPress={onPress}>
      <RegularText>Log out</RegularText>
    </Button>
  </Container>
)
