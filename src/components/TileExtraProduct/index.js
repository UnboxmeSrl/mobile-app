import React from 'react'
import styled from 'styled-components/native'

import { COLORS } from '@const'

const WIDTH = 150
export const TileExtraProduct = ({ imageUrl }) => {
  return (
    <Wrapper>
      <BackgroundColor />
      <ImageStyled resizeMode={'contain'} source={{ url: imageUrl }} />
    </Wrapper>
  )
}

const BackgroundColor = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 20px;
  bottom: 0;
  height: 100px;
  position: absolute;
  width: ${WIDTH}px;
`
const Wrapper = styled.View`
  border-radius: 20px;
  height: 160px;
  margin-right: 16px;
  width: ${WIDTH}px;
`

const ImageStyled = styled.Image`
  height: 150px;
  width: 100%;
`
