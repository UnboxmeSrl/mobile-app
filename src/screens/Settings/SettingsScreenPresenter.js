import React from 'react'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'

export const SettingsScreenPresenter = ({ onPress }) => (
  <RouteContainer tKey={'settings'}>
    <Button onPress={onPress} tKey={'logout'} />
  </RouteContainer>
)
