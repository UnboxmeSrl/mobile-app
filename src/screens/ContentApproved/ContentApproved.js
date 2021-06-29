import React from 'react'
import FastImage from 'react-native-fast-image'
import Clipboard from '@react-native-clipboard/clipboard'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ProductTile } from '@components/ProductTile'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, H3, Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

const TAGS = ['#unboxme', 'hashtag1', 'hashtag2']

export const ContentApprovedPresenter = ({ box, onPress, products }) => (
  <RouteContainer withArrow>
    <Content>
      {/* <ImageWrapper> */}
      {/*  <Image resizeMode={'contain'} source={{ uri: box.imageUrl }} /> */}
      {/* </ImageWrapper> */}
      <Row>
        <TextWrapper>
          <Title tKey={'Congratulation, your content has been approved!'} />
        </TextWrapper>
        <Subtitle color={COLORS.primaryDark}>Now you can publish your content!</Subtitle>
      </Row>
      <Row>
        <TextWrapper>
          <Body>Ideal publishing time: </Body>
          <Subtitle>08-03-2021</Subtitle>
        </TextWrapper>
        <Body>h: 12.00-14.00</Body>
        <Body>h: 19.00-20.00</Body>
      </Row>
      <Row>
        <Subtitle>Add these links to your stories</Subtitle>
        <Products horizontal showsHorizontalScrollIndicator={false}>
          {products.map((product) => (
            <ProductTile
              bottomComponent={
                <TextWrapper style={{ justifyContent: 'center', width: '100%' }}>
                  <Subtitle>Discount code: </Subtitle>
                  <Subtitle color={COLORS.primaryDark}>FEDERICA5</Subtitle>
                </TextWrapper>
              }
              description={
                <Button
                  onPress={() => {
                    Clipboard.setString('there will be a link')
                  }}
                  style={{ height: 40 }}
                  tKey={'box.copyLink'}
                />
              }
              disabled={true}
              key={product.id}
              product={product}
              style={{ marginRight: 20, width: 300 }}
            />
          ))}
        </Products>
      </Row>
      <Row>
        <Subtitle>Use these tags</Subtitle>
        <Tags horizontal>
          {TAGS.map((text) => (
            <Tag key={text}>
              <Subtitle color={COLORS.primaryDark}>{text}</Subtitle>
            </Tag>
          ))}
        </Tags>
      </Row>
    </Content>
    <SubmitButton onPress={onPress} tKey={'Click when you are done'} />
  </RouteContainer>
)

const Tags = styled.ScrollView`
  flex-direction: row;
  margin: 8px 0;
`
const Products = styled.ScrollView`
  flex-direction: row;
  margin: 8px 0;
`
const Tag = styled.View`
  background-color: ${COLORS.tertiary};
  border-radius: 10px;
  margin-right: 8px;
  padding: 4px 20px;
`
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
  margin-bottom: 24px;
`
const Columns = styled.View`
  flex-direction: row;
  margin: 12px 0px;
`
const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})`
  flex: 1;
`
const SubmitButton = styled(Button)`
  left: 20px;
  margin-top: 8px;
  width: ${screenWidth - 40}px;
`
const Body = styled(BodyText)`
  margin-bottom: 2px;
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
