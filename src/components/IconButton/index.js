import React from 'react'
import styled from 'styled-components/native'

export const IconButton = ({ onPress, Icon, style }) => (
  <Touchable onPress={onPress} style={style}>
    <Icon />
  </Touchable>
)

const Touchable = styled.TouchableOpacity`
  align-items: center;
`
