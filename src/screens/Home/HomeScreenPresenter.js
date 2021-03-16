import React from 'react'

import { Button } from '@components/Button'
import { ProgressBar } from '@components/ProgressBar'
import { RouteContainer } from '@components/RouteContainer'
import { SCREEN_NAMES } from '@const/navigation'
import { navigate } from '@services'

export const HomeScreenPresenter = ({}) => (
  <RouteContainer tKey={'Homepage'}>
    <ProgressBar currentStepIndex={1} stepsLength={10} />
    <Button
      onPress={() => {
        navigate(SCREEN_NAMES.Wizard)
      }}
    />
  </RouteContainer>
)
