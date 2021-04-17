import React from 'react'
import styled from 'styled-components/native'

import { BoxTile } from '@components/BoxTile'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'
import { H3 } from '@components/Text'
import { COLORS } from '@const'

export const HomeScreenPresenter = ({ boxes }) => (
  <RouteContainer>
    <Content>
      <LoginGuest />
      <TextWrapper>
        <H3 color={COLORS.primary}>2 </H3>
        <H3 tKey={'home.boxesAvailable'} />
      </TextWrapper>
      {boxes.map((box) => (
        <BoxTile box={box} key={box.id} />
      ))}
    </Content>
  </RouteContainer>
)

export const TextWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
`
const Content = styled.ScrollView`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`
