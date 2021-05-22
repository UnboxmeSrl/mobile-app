import React from 'react'
import styled from 'styled-components/native'

import { Rating } from '@components/Map/Dots'
import { ModalContainer } from '@components/ModalContainer'
import { ButtonText, H1, H2, H3, TinyText } from '@components/Text'
import { COLORS } from '@const'

import { Button } from '../../components/Button'

export const YourRatingPresenter = ({ onPress }) => (
  <ModalContainer noPaddingTop>
    <Content>
      <Row>
        <Score>4.5</Score>
        <DimmedScore> / 5</DimmedScore>
      </Row>
      <H3>Feedback on your Unboxing</H3>
      <Point>
        <Label>Narration</Label>
        <Rating rating={4} />
      </Point>
      <Point>
        <Label>Tags & Links</Label>
        <Rating rating={5} />
      </Point>
      <Point>
        <Label>Authenticity</Label>
        <Rating rating={4} />
      </Point>
      <Point>
        <Label>Publishing time</Label>
        <Rating rating={5} />
      </Point>
      <Tile>
        <Feedback>You collected maximum rate from this Unboxing</Feedback>
        <Label>
          You earned <FinalScore>+60exp</FinalScore>
        </Label>
      </Tile>
      <Button onPress={onPress} tKey={'great'} />
    </Content>
  </ModalContainer>
)

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`
const Content = styled.ScrollView`
  padding: 16px 20px;
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
