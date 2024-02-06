import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch } from 'react-redux'

import { MAIN_NAVIGATOR, MODAL_NAMES } from '@const/navigation'
import { reset } from '@services'
import { onAuthSuccess, signInWithEmail } from '@services/auth'

import { SCREEN_NAMES } from '../../constants/navigation'
import { setLoginData } from '../../redux/slices/authSlice'
import { userLogin } from '../../services'

import { SignInEmailPresenter } from './SignInEmailPresenter'

export const SignInEmailModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors } = useForm()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email, password } = data
        // const user = await signInWithEmail(email, password)
        const prepData = { email, password }
        const res = await userLogin(prepData)
        console.log('res', res)
        setLoading(false)
        // if (user) {
        //   onAuthSuccess()
        // }
        if (res?.id) {
          dispatch(setLoginData(res))
          navigate(SCREEN_NAMES.Cities)
        } else {
        }
      } catch (e) {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const navigateToForgot = () => navigate(MODAL_NAMES.ForgotPassword)

  const onPress = handleSubmit(onSubmit, (error) => console.log(error))

  const props = {
    control,
    errors,
    handleSubmit,
    loading,
    navigateToForgot,
    onPress,
  }

  return <SignInEmailPresenter {...props} />
}
