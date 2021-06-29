import React from 'react'

import { ActiveStepPresenter } from './ActiveStepPresenter'

export const ActiveStep = ({ currentStepIndex, steps }) => {
  const props = { currentStepIndex, steps }

  return <ActiveStepPresenter {...props} />
}
