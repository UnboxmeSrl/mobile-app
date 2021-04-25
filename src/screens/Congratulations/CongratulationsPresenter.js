import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ModalContainer } from '@components/ModalContainer'
import { BodyText, H3, Subtitle } from '@components/Text'

export const CongratulationsPresenter = ({ navigateToQuestionnaire, box }) => (
  <ModalContainer contentBased forceSmall>
    <Content>
      <ImageWrapper>
        <Image resizeMode={'contain'} source={{ uri: box.imageUrl }} />
      </ImageWrapper>
      <Row>
        <Title tKey={'congratulations'} />
        <Body tKey={'box.afterAddress'} />
      </Row>
      <SubmitButton onPress={() => null} tKey={'contactUs'} />
    </Content>
  </ModalContainer>
)

const Row = styled.View``
const Content = styled.View`
  flex: 1;
  justify-content: space-around;
  padding-bottom: 20px;
  padding-horizontal: 20px;
`
const SubmitButton = styled(Button)`
  margin-top: 8px;
`
const Body = styled(BodyText)`
  margin-bottom: 16px;
  margin-top: 16px;
`
const ImageWrapper = styled.View`
  flex: 1;
  width: 90%;
`
const Image = styled(FastImage)`
  flex: 1;
  width: 100%;
`
const Title = styled(H3)`
  margin: 12px 0;
`
