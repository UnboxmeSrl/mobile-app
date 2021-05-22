import React from 'react'
import styled from 'styled-components/native'

import { ModalContainer } from '@components/ModalContainer'
import { H1, H2 } from '@components/Text'
import { COLORS } from '@const'

export const YourRatingPresenter = ({ onPress }) => (
  <ModalContainer>
    <Content>
      <Row>
        <Score>4.5</Score>
        <DimmedScore> / 5</DimmedScore>
      </Row>
      <H2>Here there is our final feedback on your Unboxing</H2>
      {/* <SubmitButton onPress={onPress} tKey={'next'} /> */}
    </Content>
  </ModalContainer>
)

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`
const Content = styled.View`
  padding: 0 20px;
`
const Score = styled(H1)`
  color: ${COLORS.primaryDark};
`
const DimmedScore = styled(Score)`
  opacity: 0.7;
`
