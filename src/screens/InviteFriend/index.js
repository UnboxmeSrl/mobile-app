import React from 'react'
import Share from 'react-native-share'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import { InviteFriendPresenter } from '@screens/InviteFriend/InviteFriendPresenter'

import { SCREEN_NAMES } from '@const/navigation'
import { selectWizardCode } from '@redux/modules/auth'

export const InviteFriend = () => {
  const { navigate } = useNavigation()
  const code = useSelector(selectWizardCode)
  const generatedReferralCode = '23h0j5' // TODO
  const generatedLink = 'unboxme.com/23h0j5' // TODO
  const navigateToWizard = () => navigate(SCREEN_NAMES.AddCode)

  const onCopy = () => {
    Clipboard.setString(generatedReferralCode)
  }
  const onShare = () =>
    Share.open({ message: generatedLink, title: generatedLink })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })

  const props = { code, generatedLink, generatedReferralCode, navigateToWizard, onCopy, onShare }
  return <InviteFriendPresenter {...props} />
}
