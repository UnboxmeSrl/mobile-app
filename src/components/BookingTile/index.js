import React from 'react'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, ButtonText, Caption, Subtitle, TinyText } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'
import { SCREEN_NAMES } from '@const/navigation'
import { selectAwardById } from '@redux/modules/awards'

export const BookingTile = ({ ...data }) => {
  const award = useSelector(selectAwardById(data.award))
  console.log(data)
  return (
    <Wrapper>
      <Row>
        <Image source={{ uri: award.imageUrl }} />
        <Column>
          <ButtonText translations={award.name} />
          <BodyText>Address 123</BodyText>
        </Column>
      </Row>
      <Row style={{ justifyContent: 'space-between', marginTop: 16 }}>
        <TinyText>Available till: 10.06.2021</TinyText>
        <TinyText color={COLORS.primaryDark}>X days left</TinyText>
      </Row>
      <Line />
      <BottomButton>
        <TinyText>Coupon generated</TinyText>
      </BottomButton>
    </Wrapper>
  )
}

const Line = styled.View`
  background-color: white;
  height: 4px;
  margin-top: 8px;
  width: 100%;
`
const Wrapper = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  height: 170px;
  margin-right: 12px;
  padding-top: 12px;
  width: ${screenWidth / 1.5}px;
`
const Image = styled(FastImage)`
  border-radius: 10px;
  height: 72px;
  margin-right: 16px;
  width: 72px;
`
const Row = styled.View`
  flex-direction: row;
  padding: 0 12px;
`
const Column = styled.View`
  justify-content: center;
`
export const BottomButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  justify-content: center;
`
