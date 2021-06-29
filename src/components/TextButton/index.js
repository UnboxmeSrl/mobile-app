import React from 'react'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { ButtonText } from '@components/Text'
import { COLORS } from '@const'

export const TextButton = ({
  onPress,
  style,
  tKey,
  color,
  disabled,
  extraText,
  textStyle,
}) => (
  <Touchable disabled={disabled} onPress={onPress} style={style}>
    <BoldTextLink color={color} style={textStyle} tKey={tKey} />
    {extraText ? <BoldTextLink color={color}>{extraText}</BoldTextLink> : null}
  </Touchable>
)

const Touchable = styled.TouchableOpacity`
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
export const BoldTextLink = styled(ButtonText)`
  color: ${propOr(COLORS.white, 'color')};
  text-align: center;
`
