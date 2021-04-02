import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'react-navigation-hooks'
import auth from '@react-native-firebase/auth'

import { showToastError, showToastSuccess } from '@services'
import { onAuthSuccess, signInWithEmail } from '@services/auth'

import { ForgotPasswordPresenter } from './ForgotPasswordPresenter'

export const ForgotPasswordModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation()
  const { goBack } = useNavigation()
  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email } = data
        await auth().sendPasswordResetEmail(email)
        setLoading(false)
        goBack()
        showToastSuccess(t('signIn.forgotSent'))
      } catch (e) {
        showToastError(e)
        setLoading(false)
      }
    },
    [setLoading]
  )

  const onPress = handleSubmit(onSubmit)

  const props = {
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
  }

  return <ForgotPasswordPresenter {...props} />
}
