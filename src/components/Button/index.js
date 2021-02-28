import React from 'react'
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { BUTTON_HEIGHT } from '@components/Button/constants'
import { Subtitle } from '@components/Text'
import { COLORS } from '@const'

export const Button = ({ children, tKey, tOptions, loading, ...rest }) => {
  return (
    <ThemedButton disabled={loading} loading={loading} {...rest}>
      {tKey ? <Text color={COLORS.white} tKey={tKey} tOptions={tOptions} /> : children}
      {loading ? <Loader /> : null}
    </ThemedButton>
  )
}

const ThemedButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${propOr(COLORS.primary, 'bgColor')};
  border-radius: 16px;
  flex-direction: row;
  height: ${BUTTON_HEIGHT}px;
  justify-content: center;
  margin-bottom: 12px;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
  width: 100%;
`
const Loader = styled.ActivityIndicator`
  position: absolute;
  right: 20px;
`
const Text = styled(Subtitle)`
  font-size: 18px;
`
