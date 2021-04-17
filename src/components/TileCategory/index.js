import React from 'react'
import styled from 'styled-components/native'

import { BodyText } from '@components/Text'
import { COLORS } from '@const'

export const TileCategory = ({ name }) => {
  return (
    <Wrapper>
      <Text translations={name} />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  margin-right: 16px;
  min-width: 88px;
`

const Text = styled(BodyText)`
  color: ${COLORS.primaryDark};
  padding: 0 12px;
`
