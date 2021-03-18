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
      {isSelected ? <Subtitle tKey={tKeyLabel} /> : <BodyText tKey={tKeyLabel} />}
    </Item>
  )
}

const Icon = styled(Ionicons)`
  margin-right: 12px;
`

const Item = styled.TouchableOpacity`
  flex-direction: row;
  height: 24px;
  margin-bottom: 16px;
  width: 100%;
`
