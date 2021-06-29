import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { BUTTON_HEIGHT } from '@components/Button/constants'
import { ButtonText, Subtitle } from '@components/Text'
import { COLORS } from '@const'

export const Button = ({
  children,
  tKey,
  tOptions,
  loading,
  leftIconName,
  rightIconName,
  light,
  disabled,
  ...rest
}) => {
  const color = light ? COLORS.achromaticBlack : COLORS.white
  return (
    <ThemedButton
      bgColor={light ? COLORS.veryLight : COLORS.primary}
      disabled={loading || disabled}
      loading={loading}
      {...rest}
    >
      {leftIconName ? <LeftIcon color={color} name={leftIconName} size={18} /> : null}
      {tKey ? <ButtonText color={color} tKey={tKey} tOptions={tOptions} /> : children}
      {rightIconName ? <RightIcon color={color} name={rightIconName} size={18} /> : null}
      {loading ? <Loader /> : null}
    </ThemedButton>
  )
}

const ThemedButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ disabled, bgColor }) =>
    disabled ? COLORS.lightGrey : bgColor || COLORS.primary};
  border-radius: 16px;
  flex-direction: row;
  height: 48px;
  justify-content: center;
  margin-bottom: 12px;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
  width: 100%;
`
const Loader = styled.ActivityIndicator`
  position: absolute;
  right: 20px;
`
const LeftIcon = styled(Ionicons)`
  left: 20px;
  position: absolute;
`
const RightIcon = styled(Ionicons)`
  position: absolute;
  right: 20px;
`
