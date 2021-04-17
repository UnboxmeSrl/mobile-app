import React, { useMemo } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { always, indexOf, nth, pathOr, prop } from 'ramda'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, H2 } from '@components/Text'

export const WizardStep = ({ steps, stepIndex, navigateToNextStep }) => {
  const step = nth(stepIndex - 1, steps)
  const Component = prop('component', step)
  const tKeyHeader = prop('tKeyHeader', step)
  const tKeyDescription = prop('tKeyDescription', step)

  return (
    <Wrapper>
      {(tKeyHeader || tKeyDescription) && (
        <Header>
          {tKeyHeader ? <Title tKey={tKeyHeader} /> : null}
          {tKeyDescription ? <Description tKey={tKeyDescription} /> : null}
        </Header>
      )}
      <Component navigateToNextStep={navigateToNextStep} />
    </Wrapper>
  )
}

const Wrapper = styled(KeyboardAvoidingView)`
  flex: 1;
`
const Header = styled.View`
  margin-bottom: 24px;
  margin-top: 8px;
`
const Description = styled(BodyText)`
  text-align: center;
`
const Title = styled(H2)`
  text-align: center;
`
export const StepContent = styled.View`
  flex: 1;
  justify-content: space-between;
`
