import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch } from 'react-redux'

import { MAIN_NAVIGATOR } from '@const/navigation'
import { PASSWORD_RULES } from '@const/validators'
import { reset } from '@services'
import { onAuthSuccess, registerEmailAccount } from '@services/auth'

import { SCREEN_NAMES } from '../../constants/navigation'
import { setAuthData } from '../../redux/slices/authSlice'

import { SignUpEmailPresenter } from './SignUpEmailPresenter'

export const SignUpEmailModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors, watch } = useForm()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email, password } = data
        dispatch(setAuthData({ email, password }))
        // await registerEmailAccount(email, password)
        setLoading(false)
        // onAuthSuccess()
        navigate(SCREEN_NAMES.Wizard)
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

  return <SignUpEmailPresenter {...props} />
}
