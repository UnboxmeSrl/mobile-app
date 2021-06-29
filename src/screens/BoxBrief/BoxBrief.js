import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, H3, Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

export const BoxBriefPresenter = ({ box, onPress }) => (
  <RouteContainer withArrow>
    <Content>
      <ImageWrapper>
        <Image resizeMode={'contain'} source={{ uri: box.imageUrl }} />
      </ImageWrapper>
      <Row>
        <TextWrapper>
          <Title color={COLORS.primary}>1 </Title>
          <Title tKey={'Talk about Farmacia'} />
        </TextWrapper>
        <Body>Before beginning of the unboxing show yourself with the Box and start talking about Farmacia 1.</Body>
        <Body>Farmacia 1 is an online pharmacy that delivers in 24-48hours.</Body>
        <Body>This week there are special discounts on the beauty and skincare producs.</Body>
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Subtitle>Framing</Subtitle>
        <Columns>
          <Placeholder />
          <Body style={{ flex: 0.4 }}>
            Show the box or yourself and the box while closed while talking about Farmaciauno.{' '}
          </Body>
        </Columns>
      </Row>
    </Content>
    <SubmitButton onPress={onPress} tKey={'next'} />
  </RouteContainer>
)
const TextWrapper = styled.View`
  flex-direction: row;
`
const Placeholder = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 10px;
  flex: 0.6;
  height: 120px;
  margin-right: 16px;
`
const Row = styled.View``
const Columns = styled.View`
  flex-direction: row;
  margin: 12px 0px;
`
const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
  },
})`
  padding-bottom: 20px;
  padding-horizontal: 20px;
`
const SubmitButton = styled(Button)`
  bottom: 0;
  left: 20px;
  margin-top: 8px;
  position: absolute;
  width: ${screenWidth - 40}px;
`
const Body = styled(BodyText)`
  margin-bottom: 8px;
  margin-top: 0px;
`
const ImageWrapper = styled.View`
  flex: 0.7;
  width: 90%;
`
const Image = styled(FastImage)`
  flex: 1;
  width: 100%;
`
const Title = styled(H3)`
  margin: 12px 0;
`
