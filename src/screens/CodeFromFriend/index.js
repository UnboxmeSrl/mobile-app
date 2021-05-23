import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { CodeFromFriendPresenter } from '@screens/CodeFromFriend/CodeFromFriendPresenter'

export const CodeFromFriend = () => {
  const { goBack } = useNavigation()
  const navigateToNextStep = goBack
  return <CodeFromFriendPresenter navigateToNextStep={navigateToNextStep} />
}
