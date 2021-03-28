import React from 'react'
import styled from 'styled-components/native'

import { BoxTile, BoxTile2 } from '@components/BoxTile'
import { Button } from '@components/Button'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'
import { H3 } from '@components/Text'
import { COLORS } from '@const'

export const HomeScreenPresenter = ({ onPress }) => (
  <RouteContainer>
    <Content>
      <LoginGuest />
      <TextWrapper>
        <H3 color={COLORS.primary}>2 </H3>
        <H3 tKey={'home.boxesAvailable'} />
      </TextWrapper>
      <BoxTile />
      <BoxTile2 />
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
