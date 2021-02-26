import React from 'react'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { COLORS, FONTS } from '@const'

export const TextButton = ({ onPress, style, tKey }) => (
  <Touchable onPress={onPress} style={style}>
    <Bold tKey={tKey} />
  </Touchable>
)

const Touchable = styled.TouchableOpacity`
  align-items: center;
`
const Bold = styled(SmallText)`
  color: ${COLORS.white};
  font-family: ${FONTS.semiBold};
  text-align: center;
`

