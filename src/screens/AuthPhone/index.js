import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { CODE_RULES } from '@const/validators'
import { selectUid } from '@redux/modules/auth'
import { reset } from '@services'

import { AuthPhonePresenter } from './AuthPhonePresenter'

export const AuthPhoneModal = () => {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const [timer, setTimer] = useState(60)
  const userId = useSelector(selectUid)
  const { control, handleSubmit, errors, watch } = useForm()
  const phone = watch('phone')

  const sendVerificationCode = useCallback(
    async ({ phone }) => {
      setLoading(true)
      setLoading(false)
    },
    [setLoading]
  )

  const verifyPhoneCode = useCallback(
    async ({ code }) => {
      try {
        setLoading(true)
        await confirm.confirm(code)
        setLoading(false)
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

  // auto validation for android
  useEffect(() => {
    if (confirm?.confirm && userId) {
      reset(MAIN_NAVIGATOR)
    }
  }, [confirm, userId])

  const resendCode = useCallback(() => {
    sendVerificationCode({ phone })
  }, [phone, sendVerificationCode])

  useEffect(() => {
    let timer = null
    if (confirm?.confirm) {
      timer = setInterval(() => setTimer((timer) => Math.max(0, timer - 1)), 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [confirm])

  const onSubmit = confirm ? verifyPhoneCode : sendVerificationCode
  const onPress = handleSubmit(onSubmit)
  const showCodeInput = confirm && confirm.confirm
  const tKey = showCodeInput ? 'auth.verifyCode' : 'auth.sendVerificationCode'
  const codeRules = showCodeInput ? CODE_RULES : {}
  const resendDisabled = timer > 0
  const props = {
    codeRules,
    confirm,
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
    resendCode,
    resendDisabled,
    showCodeInput,
    tKey,
    timer,
  }

  return <AuthPhonePresenter {...props} />
}
