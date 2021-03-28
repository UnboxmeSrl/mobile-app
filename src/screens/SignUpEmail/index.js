import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { PASSWORD_RULES } from '@const/validators'
import { reset } from '@services'
import { onAuthSuccess, registerEmailAccount } from '@services/auth'

import { SignInEmailPresenter } from './SignInEmailPresenter'

export const SignUpEmailModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors, watch } = useForm()

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email, password } = data
        await registerEmailAccount(email, password)
        setLoading(false)
        onAuthSuccess()
      } catch (e) {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const confirmPasswordRules = {
    ...PASSWORD_RULES,
    validate: (value) => (value === watch('password') ? null : 'passwordsDontMatch'),
  }

  const onPress = handleSubmit(onSubmit)

  const props = {
    confirmPasswordRules,
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
  }

  return <SignInEmailPresenter {...props} />
}
