import React from 'react'
import styled from 'styled-components/native'

import { COLORS } from '@const'

export const TileBrand = ({ image }) => {
  return (
    <Wrapper>
      <ImageStyled source={image} />
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

const ImageStyled = styled.Image`
  height: 84px;
  width: 140px;
`
