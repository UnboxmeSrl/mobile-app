import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BigLight, Subtitle } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'

export const WizardStepReviewPresenter = ({ openInstagram, tKey, isRejected, navigateToHome, isVerified }) => {
  return (
    <StepContent>
      <Wrapper>
        <Text tKey={tKey} />
      </Wrapper>
      {isRejected && (
        <Policy>
          <Subtitle tKey={'review.policy'} />
          <Ionicons color={COLORS.black} name={'chevron-forward-outline'} size={22} />
        </Policy>
      )}
      <Button light onPress={navigateToHome} rightIconName={'logo-instagram'} tKey={'followUs'} />
      {isVerified && <Button onPress={navigateToHome} tKey={'continue'} />}
    </StepContent>
  )
}

const Policy = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 40px;
  justify-content: space-between;
  margin-bottom: 16px;
`
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
`
const Text = styled(BigLight)`
  font-size: 24px;
  letter-spacing: 1px;
  line-height: 36px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
`
