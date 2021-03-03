import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { reset } from '@services'
import { sendPhoneVerificationCode } from '@services/auth'

import { AuthPhonePresenter } from './AuthPhonePresenter'

export const AuthPhoneModal = () => {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const { control, handleSubmit, errors } = useForm()

  const sendVerificationCode = useCallback(
    async ({ phone }) => {
      setLoading(true)
      const confirmation = await sendPhoneVerificationCode(phone)

      setConfirm(confirmation)
      setLoading(false)
    },
    [setLoading, setConfirm]
  )

  const verifyPhoneCode = useCallback(
    async ({ code }) => {
      try {
        setLoading(true)
        await confirm.confirm(code)
        setLoading(false)
        reset(MAIN_NAVIGATOR)
      } catch (error) {
        Toast.show({
          text1: 'Error',
          text2: error?.message,
          type: 'error',
        })
        setLoading(false)
      }
    },
    [setLoading, confirm]
  )

  const onSubmit = confirm ? verifyPhoneCode : sendVerificationCode

  const onPress = handleSubmit(onSubmit)
  const showCodeInput = confirm && confirm.confirm

  const props = {
    confirm,
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
    showCodeInput,
  }

  return <AuthPhonePresenter {...props} />
}
