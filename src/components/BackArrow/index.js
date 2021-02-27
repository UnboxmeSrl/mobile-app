import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { BackArrowPresenter } from '@components/BackArrow/BackArrowPresenter'

export const BackArrow = ({ onPress, style }) => {
  const { goBack } = useNavigation()
  const onPressHandler = useCallback(() => {
    goBack()
    onPress && onPress()
  }, [goBack, onPress])

  return <BackArrowPresenter onPress={onPressHandler} style={style}/>
}

