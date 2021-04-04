import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components/native'

import { BodyText, H3, Subtitle, TinyText } from '@components/Text'
import { COLORS } from '@const'
import { MODAL_NAMES } from '@const/navigation'

import { IMAGES } from '../../assets/images'

export const BoxTile = () => {
  const { navigate } = useNavigation()
  return (
    <Wrapper
      onPress={() => {
        navigate(MODAL_NAMES.Box)
      }}
    >
      <Content>
        <Title>October box</Title>
        <Row>
          <Label>Brands: </Label>
          <Values>Este Lauder, Loreal, Kiels, Avene, etc.</Values>
        </Row>
        <Row>
          <Label>Brands: </Label>
          <Values>Este Lauder, Loreal, Kiels, Avene, etc.</Values>
        </Row>
        <Row>
          <Label>Available boxes: </Label>
          <Values>29</Values>
        </Row>
      </Content>
      <ItemsImage source={IMAGES.boxItems} />
    </Wrapper>
  )
}
export const BoxTile2 = () => {
  const { navigate } = useNavigation()
  return (
    <Wrapper
      onPress={() => {
        navigate(MODAL_NAMES.Box)
      }}
    >
      <Content>
        <Title>Special box</Title>
        <Row>
          <Label>Brands: </Label>
          <Values>Este Lauder, Loreal, Kiels, Avene, etc.</Values>
        </Row>
        <Row>
          <Label>Brands: </Label>
          <Values>Sephora, Caudalie, Elemis, very long names of different brand into 2 lines</Values>
        </Row>
        <Row>
          <Label>Available boxes: </Label>
          <Values>120</Values>
        </Row>
      </Content>
      <ItemsImage source={IMAGES.boxItems2} />
    </Wrapper>
  )
}
const Wrapper = styled.TouchableOpacity`
  height: 210px;
  justify-content: flex-end;
  margin-top: 32px;
`
const Row = styled.View`
  flex-direction: row;
  margin-top: 4px;
`
const Content = styled.View`
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  justify-content: center;
  min-height: 152px;
  padding: 24px;
  width: 100%;
`
const Label = styled(TinyText)`
  color: ${COLORS.primaryDark};
`
const Values = styled(TinyText).attrs({ numberOfLines: 2 })`
  flex: 1;
`
const Title = styled(H3)`
  margin-bottom: 8px;
`
const ItemsImage = styled(Image)`
  height: 112px;
  position: absolute;
  right: 0;
  top: 0;
  width: 160px;
`
