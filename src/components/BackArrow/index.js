import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components/native'

import { BackArrowPresenter } from '@components/BackArrow/BackArrowPresenter'

export const BackArrow = ({ onPress, style, noBack, hidden }) => {
  const { goBack } = useNavigation()
  const onPressHandler = useCallback(() => {
    !noBack && goBack()
    onPress && onPress()
  }, [goBack, noBack, onPress])

  return hidden ? (
    <Hidden />
  ) : (
    <BackArrowPresenter onPress={onPressHandler} style={style} />
  )
}

const Hidden = styled.View`
  flex: 1;
  height: 48px;
`
