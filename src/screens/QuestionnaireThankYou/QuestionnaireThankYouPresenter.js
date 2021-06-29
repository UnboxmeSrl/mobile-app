import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ModalContainer } from '@components/ModalContainer'
import { BodyText, Subtitle } from '@components/Text'

export const QuestionnaireThankYouPresenter = ({ onPress }) => (
  <ModalContainer contentBased forceSmall tKey={'questionnaire.title'}>
    <Content>
      <Row>
        <Subtitle tKey={'questionnaire.thankYou'} />
        <Body tKey={'questionnaire.nowWeCanOffer'} />
      </Row>
      <SubmitButton onPress={onPress} tKey={'questionnaire.getTheBox'} />
    </Content>
  </ModalContainer>
)

const Row = styled.View``
const Content = styled.View`
  flex: 1;
  justify-content: space-around;
  padding-bottom: 20px;
  padding-horizontal: 20px;
  padding-top: 20px;
`
const SubmitButton = styled(Button)`
  margin-top: 8px;
`
const Body = styled(BodyText)`
  margin-bottom: 16px;
  margin-top: 16px;
`
