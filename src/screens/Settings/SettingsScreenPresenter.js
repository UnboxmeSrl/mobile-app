import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'

export const SettingsScreenPresenter = ({ onPress, isLogged }) => (
  <Container tKey={'settings'} withPadding>
    {isLogged ? <Button onPress={onPress} tKey={'logout'} /> : null}
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
  justify-content: flex-end;
`
