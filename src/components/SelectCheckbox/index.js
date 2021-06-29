import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { BodyText, Subtitle } from '@components/Text'
import { COLORS } from '@const'

export const SelectCheckbox = ({ tKeyLabel, isSelected, isAnySelected, onPress }) => {
  return (
    <Item isSelected={isSelected} onPress={onPress}>
      <Icon
        color={COLORS.primary}
        name={isSelected ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
      />
      <Wrapper>
        {isSelected ? <Subtitle tKey={tKeyLabel} /> : <BodyText tKey={tKeyLabel} />}
      </Wrapper>
    </Item>
  )
}

const Icon = styled(Ionicons)`
  margin-right: 12px;
`

const Item = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 16px;
  min-height: 24px;
  width: 100%;
`
const Wrapper = styled.View`
  flex: 1;
  top: -2px;
`
