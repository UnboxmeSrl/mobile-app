import React from 'react'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { COLORS, FONTS } from '@const'

export const TextButton = ({ onPress, style, tKey, color, disabled, extraText }) => (
  <Touchable disabled={disabled} onPress={onPress} style={style}>
    <BoldTextLink color={color} tKey={tKey} />
    {extraText ? <BoldTextLink color={color}>{extraText}</BoldTextLink> : null}
  </Touchable>
)

const Touchable = styled.TouchableOpacity`
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
export const BoldTextLink = styled(SmallText)`
  color: ${propOr(COLORS.white, 'color')};
  font-family: ${FONTS.semiBold};
  text-align: center;
`
