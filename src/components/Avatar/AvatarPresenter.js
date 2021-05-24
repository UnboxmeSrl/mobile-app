import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

const BUTTON_SIZE = 48

export const AvatarPresenter = ({ onPress, style, placeholder, source }) => (
  <Button onPress={onPress} style={style}>
    <Image source={source || placeholder} />
  </Button>
)

const Button = styled.TouchableOpacity`
  margin-bottom: 16px;
`
const Image = styled(FastImage)`
  border-radius: 24px;
  height: 112px;
  width: 112px;
`
