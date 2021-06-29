import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ProductTile } from '@components/ProductTile'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, H3, Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

export const BoxBrief2Presenter = ({ box, onPress, products }) => (
  <RouteContainer withArrow>
    <Content>
      {/* <ImageWrapper> */}
      {/*  <Image resizeMode={'contain'} source={{ uri: box.imageUrl }} /> */}
      {/* </ImageWrapper> */}
      <Row>
        <TextWrapper>
          <Title color={COLORS.primary}>2 </Title>
          <Title tKey={'Show the inside'} />
        </TextWrapper>
        <Body>
          Now open the box and show the inside, saying something about each product and if possible, relate this to your
          personal experience. You can find products info in the next section{' '}
        </Body>
      </Row>
      <Row>
        <TextWrapper>
          <Title color={COLORS.primary}>3 </Title>
          <Title tKey={'Swipe up'} />
        </TextWrapper>
        <Body>
          Prepare a video for each product of the list where you see using it and add a swipeup at the end of each
        </Body>
        <TextWrapper>
          <Subtitle>Discount code: </Subtitle>
          <Subtitle color={COLORS.primaryDark}>FEDERICA5</Subtitle>
        </TextWrapper>
      </Row>
      <Row>
        <TextWrapper>
          <Title color={COLORS.primary}>4 </Title>
          <Title>Send your videos for approval</Title>
        </TextWrapper>
        <Body>Read about each product:</Body>
      </Row>
      <Row>
        {products.map((product) => (
          <ProductTile
            bottomComponent={
              <TextWrapper style={{ justifyContent: 'center', width: '100%' }}>
                <Subtitle>Discount code: </Subtitle>
                <Subtitle color={COLORS.primaryDark}>FEDERICA5</Subtitle>
              </TextWrapper>
            }
            description={
              'La Roche-Posay is the perfect cream for your morning routine: it can help your skin hydratation while respecting your PH'
            }
            key={product}
            product={product}
          />
        ))}
      </Row>
      <SubmitButton onPress={onPress} tKey={'next'} />
    </Content>
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
const Row = styled.View`
  margin-bottom: 12px;
`
const Columns = styled.View`
  flex-direction: row;
  margin: 12px 0px;
`
const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``
const SubmitButton = styled(Button)`
  margin-top: 8px;
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
