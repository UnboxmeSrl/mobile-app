import React from 'react'
import styled from 'styled-components/native'

import { Rating } from '@components/Map/Dots'
import { ModalContainer } from '@components/ModalContainer'
import { ButtonText, H1, H2, H3, TinyText } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

import { Button } from '../../components/Button'

export const YourRatingPresenter = ({ onPress, order, score }) => (
  <ModalContainer noPaddingTop>
    <Content>
      <Row>
        <Score>{score || 0}</Score>
        <DimmedScore> / 5</DimmedScore>
      </Row>
      <Title>Feedback on your Unboxing</Title>
      {order?.feedback?.map(({ labelKey, value }) => (
        <Point key={labelKey}>
          <Label tKey={labelKey} />
          <Rating rating={value} />
        </Point>
      ))}
      <Tile>
        <Feedback>You collected maximum rate from this Unboxing</Feedback>
        <Label>
          You earned <FinalScore>+{order.points || 0}exp</FinalScore>
        </Label>
      </Tile>
      <SubmitButton onPress={onPress} tKey={'great'} />
    </Content>
  </ModalContainer>
)

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`
const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
  },
})`
  padding: 16px 20px;
`
const Title = styled(H3)`
  margin-bottom: 24px;
  margin-top: 12px;
`
const Score = styled(H2)`
  color: ${COLORS.primaryDark};
`
const DimmedScore = styled(Score)`
  opacity: 0.7;
`
const Label = styled(ButtonText)`
  color: ${COLORS.achromaticBlack};
`
const Feedback = styled(TinyText)`
  margin-bottom: 8px;
`
const FinalScore = styled(Label)`
  color: ${COLORS.primaryDark};
`
const Point = styled.View`
  margin: 4px 0;
`
const Tile = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  justify-content: center;
  margin: 16px 0;
  padding: 16px;
`
const SubmitButton = styled(Button)`
  bottom: 0;

  margin-top: 8px;
  position: absolute;
`
