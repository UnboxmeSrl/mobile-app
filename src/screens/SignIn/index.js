import React, { useCallback, useRef, useState } from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import { MAIN_NAVIGATOR, MODAL_NAMES } from '@const/navigation'
import { reset } from '@services'
import { SignInPresenter } from './SignInPresenter'

export const SignInScreen = () => {
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()
  const isFromBookRedirected = useNavigationParam('isFromBookRedirected')
  const ref = useRef()

  const navigateToEmailModal = () => {
    // ref?.current?.open()
    // 👇🏻 👇🏻 👇🏻 👇🏻 Need to Update this
    navigate({
      params: {
        isFromBookRedirected: isFromBookRedirected,
      },
      routeName: MODAL_NAMES.SignInEmail,
    })
  }
  const navigateToPhoneModal = () => {
    navigate(MODAL_NAMES.AuthPhone)
  }
  const onSuccess = useCallback(() => {
    onAuthSuccess()
  }, [])

  const props = {
    loading,
    navigateToEmailModal,
    navigateToPhoneModal,
    onSuccess,
    setLoading,
  }
  return <SignInPresenter {...props} ref={ref} />
}
