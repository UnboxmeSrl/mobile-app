import React from 'react'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, ButtonText } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

export const AwardTileFull = ({ label, image, onPress, points }) => {
  return (
    <BackgroundImage onPress={onPress} source={{ uri: image }}>
      <PointsWrapper>
        <Points>{points}</Points>
        <Ionicons color={COLORS.achromaticBlack} name={'trophy'} size={14} />
      </PointsWrapper>
      <StyledButton light>
        <BoldTextLink tKey={'awards.coupon'} tOptions={{ label }} />
      </StyledButton>
    </BackgroundImage>
  )
}

const BackgroundImage = styled(FastImage)`
  align-items: center;
  border-radius: 16px;
  height: 224px;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 12px;
  width: 100%;
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
