import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'

export const SettingsScreenPresenter = ({ onPress }) => (
  <Container tKey={'settings'} withPadding>
    <Button onPress={onPress} tKey={'logout'} />
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
  justify-content: flex-end;
`
