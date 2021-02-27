import React from 'react'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { COLORS, FONTS } from '@const'

export const TextButton = ({ onPress, style, tKey, color }) => (
  <Touchable onPress={onPress} style={style}>
    <BoldTextLink color={color} tKey={tKey}/>
  </Touchable>
)

const Touchable = styled.TouchableOpacity`
  align-items: center;
`
export const BoldTextLink = styled(SmallText)`
  color: ${propOr(COLORS.white, 'color')};
  font-family: ${FONTS.semiBold};
  text-align: center;
`

