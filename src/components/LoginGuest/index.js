import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BUTTON_HEIGHT } from '@components/Button/constants'
import { BodyText, ButtonText, SmallText, Subtitle } from '@components/Text'
import { COLORS } from '@const'
import { SCREEN_NAMES } from '@const/navigation'
import { selectIsAuthenticated } from '@redux/modules/auth'

export const LoginGuest = () => {
  const { navigate } = useNavigation()
  const navigateToLogin = () => navigate(SCREEN_NAMES.SignUp)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return null
  }
  return (
    <Wrapper>
      <Subtitle tKey={'wantUseAll'} />
      <Text tKey={'registerOrLogin'} />
      <Button onPress={navigateToLogin} tKey={'loginTitle'} />
    </Wrapper>
  )
}

const Text = styled(SmallText)`
  margin-bottom: 16px;
  text-align: center;
`
const Wrapper = styled.View`
  align-items: center;
  margin-top: 16px;
`
