import React, { useCallback, useRef } from 'react'
import { Alert } from 'react-native'
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import InstagramLogin from 'react-native-instagram-login'
import { useSelector } from 'react-redux'
import CookieManager from '@react-native-community/cookies'
import axios from 'axios'

import { Button } from '@components/Button'
import { COLORS } from '@const'
import { useAction } from '@hooks/common'
import authModule, {
  _instagram,
  selectInstagramUsername,
  updateMe,
} from '@redux/modules/auth'
import { logger, showToastError } from '@services'
import i18n from '@services/i18n'

const secret = '24c77bc3a620ced73dbb001c1d6f195b'
export const Instagram = ({ onSuccess, setLoading, loading }) => {
  const ref = useRef()
  const updateMeAction = useAction(updateMe)

  const instagramUsername = useSelector(selectInstagramUsername)
  console.log(instagramUsername)

  const exchangeForLongToken = async ({ access_token, user_id }) => {
    const res = await axios.get(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${secret}&access_token=${access_token}`
    )
    const user = await axios.get(
      `https://graph.instagram.com/${user_id}?fields=account_type,id,username&access_token=${access_token}`
    )
    if (res?.data && user.data) {
      updateMeAction({ [_instagram]: { ...res.data, ...user.data } })
    } else {
      showToastError('Something went wrong')
    }
  }
  const onLoginSuccess = useCallback(
    ({ access_token, user_id }) => {
      exchangeForLongToken({ access_token, user_id })
    },
    [exchangeForLongToken]
  )
  const onPress = useCallback(() => {
    if (instagramUsername) {
      Alert.alert('Are you sure you want disconnect Instagram account?', '', [
        {
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => {
            CookieManager.clearAll(true)
            updateMeAction({ [_instagram]: {} })
          },
          text: 'Disconnect me',
        },
      ])
    } else {
      ref.current?.show()
    }
  }, [instagramUsername, updateMeAction])

  return (
    <>
      <Button
        bgColor={COLORS.primary}
        leftIconName={'logo-instagram'}
        loading={loading}
        onPress={onPress}
        tKey={instagramUsername ? 'connected' : 'connectInstagram'}
        tOptions={{ username: `@${instagramUsername}` }}
      />
      <InstagramLogin
        appId="770594490219754"
        appSecret="24c77bc3a620ced73dbb001c1d6f195b"
        onLoginFailure={logger.error}
        onLoginSuccess={onLoginSuccess}
        redirectUrl="https://unboxme-firebase.firebaseapp.com/"
        ref={ref}
        scopes={['user_profile', 'user_media']}
      />
    </>
  )
}
