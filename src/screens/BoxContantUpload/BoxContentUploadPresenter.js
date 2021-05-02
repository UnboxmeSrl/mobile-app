import React from 'react'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'
import { UploadPlaceholder } from '@components/UploadPlaceholder'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

const SIZE = (screenWidth - 80) / 2
export const BoxContentUploadPresenter = ({ box, onPress, products, items }) => (
  <RouteContainer tKey={'box.uploadContent'} withArrow>
    <Content>
      <Placeholders>
        {items.map((item) => (
          <UploadPlaceholder fromStorage item={item} key={item.fullPath} />
        ))}
        <UploadPlaceholder />
        <UploadPlaceholder />
        <UploadPlaceholder />
        <UploadPlaceholder />
        <UploadPlaceholder />
        <UploadPlaceholder />
      </Placeholders>
    </Content>
    {/* <SubmitButton onPress={onPress} tKey={'next'} /> */}
  </RouteContainer>
)

const Content = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`
const Placeholders = styled.View`
  align-items: flex-start;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`
const Placeholder = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  height: ${SIZE}px;
  justify-content: center;
  margin: 7.5px;
  width: ${SIZE}px;
`
const SubmitButton = styled(Button)`
  bottom: 0;
  left: 20px;
  margin-top: 8px;
  position: absolute;
  width: ${screenWidth - 40}px;
`
