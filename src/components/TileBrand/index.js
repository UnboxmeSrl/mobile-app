import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import { COLORS } from '@const'

export const TileBrand = ({ imageDarkUrl }) => {
  return (
    <Wrapper>
      <ImageStyled source={{ uri: imageDarkUrl }} />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 20px;
  height: 84px;
  margin-right: 16px;
  width: 140px;
`

const ImageStyled = styled(FastImage)`
  height: 84px;
  width: 140px;
`
