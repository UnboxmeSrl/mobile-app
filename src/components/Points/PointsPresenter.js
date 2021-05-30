import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { ButtonText } from '@components/Text'
import { COLORS } from '@const'

export const PointsPresenter = ({ points }) => (
  <Wrapper>
    <Ionicons color={COLORS.achromaticBlack} name={'trophy-outline'} size={24} />
    <Points> {points}</Points>
  </Wrapper>
)

const Points = styled(ButtonText)`
  font-size: 24px;
  line-height: 24px;
  margin-top: 2px;
`
const Wrapper = styled.View`
  flex-direction: row;
`
