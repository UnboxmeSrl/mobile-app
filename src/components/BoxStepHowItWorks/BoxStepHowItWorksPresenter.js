import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, ButtonText, H3 } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'

export const BoxStepHowItWorksPresenter = ({ onPress }) => {
  return (
    <Step>
      <Title tKey={'howItWorks.title'} />
      <Sections showsVerticalScrollIndicator={false}>
        <Section>
          <SectionNumber>
            1 <SectionTitle tKey={'howItWorks.appAndApproval'} />
          </SectionNumber>
          <Description tKey={'howItWorks.appAndApprovalDesc'} />
        </Section>
        <Section>
          <SectionNumber>
            2 <SectionTitle tKey={'howItWorks.unboxing'} />
          </SectionNumber>
          <Description tKey={'howItWorks.unboxingDesc'} />
        </Section>
        <Section>
          <SectionNumber>
            3 <SectionTitle tKey={'howItWorks.publish'} />
          </SectionNumber>
          <Description tKey={'howItWorks.publishDesc'} />
        </Section>
        <Section>
          <SectionNumber>
            4 <SectionTitle tKey={'howItWorks.getFeedback'} />
          </SectionNumber>
          <Description tKey={'howItWorks.getFeedbackDesc'} />
        </Section>
      </Sections>
      <Bottom>
        <Button onPress={onPress} tKey={'next'} />
      </Bottom>
    </Step>
  )
}

const Sections = styled.ScrollView``
const Section = styled.View`
  margin-bottom: 12px;
`
const Bottom = styled.View`
  margin-bottom: 16px;
`
const Step = styled(StepContent)``
const Title = styled(H3)`
  margin-bottom: 16px;
`
const SectionTitle = styled(ButtonText)`
  margin-bottom: 0;
`
const SectionNumber = styled(SectionTitle)`
  color: ${COLORS.primaryDark};
`
const Description = styled(BodyText)``
