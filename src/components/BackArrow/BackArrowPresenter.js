import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { COLORS } from '@const'

const BUTTON_SIZE = 48

export const BackArrowPresenter = ({ onPress, style }) => (
  <Button onPress={onPress} style={style}>
    <Ionicons color={COLORS.black} name={'arrow-back-outline'} size={BUTTON_SIZE / 2} />
  </Button>
)

const Button = styled.TouchableOpacity`
  align-items: center;
  align-self: flex-start;
  border-radius: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  justify-content: center;
  width: ${BUTTON_SIZE}px;
`
