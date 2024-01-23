import React from 'react'
import styled from 'styled-components/native'

import { ButtonText } from '@components/Text'
import { COLORS } from '@const'

export const CategoryPresenter = ({ CategoryName, selected, onPress }) => {
  return (
    <Wrapper onPress={onPress} selected={selected}>
      <Text selected={selected}>{CategoryName}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? COLORS.primary : COLORS.tertiary)};
  border-radius: 10px;
  margin-right: 12px;
  padding: 8px 20px;
`
const Text = styled(ButtonText)`
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.primaryDark)};
`
