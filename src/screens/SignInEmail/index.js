import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { reset } from '@services'
import { onAuthSuccess, signInWithEmail } from '@services/auth'

import { SignInEmailPresenter } from './SignInEmailPresenter'

export const SignInEmailModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors } = useForm()

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email, password } = data
        const user = await signInWithEmail(email, password)
        setLoading(false)
        if (user) {
          onAuthSuccess()
        }
      } catch (e) {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const onPress = handleSubmit(onSubmit, (error) => console.log(error))

  const props = {
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
  }

  return <SignInEmailPresenter {...props} />
}
