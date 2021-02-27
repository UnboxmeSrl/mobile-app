import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigation } from 'react-navigation-hooks'

import { SCREEN_NAMES } from '@const/navigation'

import { SignUpEmailPresenter } from './SignUpEmailPresenter'

export const SignUpEmailModal = () => {
  const { control, handleSubmit, errors } = useForm()

  const { navigate } = useNavigation()
  const onPress = useCallback(() => {
    navigate(SCREEN_NAMES.OtherSignUp)
  }, [navigate])

  const props = {
    control,
    errors,
    handleSubmit,
    onPress,
  }

  return <SignUpEmailPresenter {...props} />
}
