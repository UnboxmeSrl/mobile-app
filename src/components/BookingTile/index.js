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
    </Wrapper>
  )
}

const Wrapper = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  flex: 1;
  height: 130px;
  padding: 12px;
  width: ${screenWidth / 1.5}px;
`
const Image = styled(FastImage)`
  border-radius: 10px
  height: 72px;
  width: 72px;
  margin-right: 16px;
`
const Row = styled.View`
  flex-direction: row;
`
const Column = styled.View`
  justify-content: center;
`
const StyledButton = styled(Button)`
  height: 32px;
  width: 90%;
`
export const BoldTextLink = styled(ButtonText)`
  font-size: 14px;
  text-align: center;
`

export const PointsWrapper = styled.View`
  align-items: center;
  background-color: white;
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  padding: 4px 8px;
  position: absolute;
  right: 12px;
  top: 12px;
`
const Points = styled(BoldTextLink)`
  margin-right: 4px;
`
