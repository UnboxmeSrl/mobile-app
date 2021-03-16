import React from 'react'
import styled from 'styled-components/native'

import { ButtonText } from '@components/Text'
import { COLORS } from '@const'

export const SelectItem = ({ tKeyLabel, isSelected, isAnySelected, onPress }) => {
  return (
    <Item isAnySelected={isAnySelected} isSelected={isSelected} onPress={onPress}>
      <ButtonText color={isSelected ? COLORS.white : COLORS.black} tKey={tKeyLabel} />
    </Item>
  )
}

const Item = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ isSelected }) =>
    isSelected ? COLORS.primary : COLORS.veryLight};
  border-radius: 20px;
  flex-direction: row;
  height: 64px;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`
