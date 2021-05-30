import React from 'react'
import styled from 'styled-components/native'

import { H3 } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'

export const SectionHeader = ({ tKey, onPress }) => (
  <Wrapper>
    <Title tKey={tKey} />
    <TextButton color={COLORS.dark} onPress={onPress} tKey={'showAll'} />
  </Wrapper>
)

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`
const Title = styled(H3)``
