import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

import { CODE_RULES } from '@const/validators'
import { selectUid } from '@redux/modules/auth'

import { SCREEN_NAMES } from '../../constants/navigation'
import { setLoginData } from '../../redux/slices/authSlice'
import { navigate, showToastError, showToastSuccess } from '../../services'
import { getOtpByNumber, verifyOtp } from '../../services/SignUp'

import { AuthPhonePresenter } from './AuthPhonePresenter'

export const AuthPhoneModal = () => {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(60)
  const userId = useSelector(selectUid)
  const { control, handleSubmit, errors, watch } = useForm()
  const phone = watch('phone')
  const sendVerificationCode = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getOtpByNumber({
        phoneNumber: phone,
      })
      if (res?.success) {
        showToastSuccess('Verification code sent')
        setConfirm(res?.success)
      }
      setLoading(false)
    } catch (error) {
      showToastError(error)
      setLoading(false)
    }
  }, [setLoading, phone])

  const verifyPhoneCode = useCallback(
    async ({ code }) => {
      try {
        setLoading(true)
        const body = {
          code,
        }
        const res = await verifyOtp(body)
        if (res?.success) {
          dispatch(setLoginData(res?.data))
          navigate(SCREEN_NAMES.AppliedScreen)
        }
      } catch (error) {
        showToastError(error)
        setLoading(false)
      }
    },
    [setLoading, dispatch]
  )

  // auto validation for android
  // useEffect(() => {
  //   if (confirm?.confirm && userId) {
  //     reset(MAIN_NAVIGATOR)
  //   }
  // }, [confirm, userId])

  const resendCode = useCallback(() => {
    sendVerificationCode({ phone })
  }, [phone, sendVerificationCode])

  useEffect(() => {
    let timer = null
    if (confirm) {
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
  const showCodeInput = confirm
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
