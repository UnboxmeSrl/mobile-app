import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import OneSignal from 'react-native-onesignal'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { MODAL_NAMES } from '@const/navigation'

import { SCREEN_NAMES } from '../../constants/navigation'
import { setLoginData } from '../../redux/slices/authSlice'
import { setBookings } from '../../redux/slices/restaurantSlice'
import { getBookings, userLogin } from '../../services'

import { SignInEmailPresenter } from './SignInEmailPresenter'

export const SignInEmailModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors } = useForm()
  const { navigate } = useNavigation()
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const isFromBookRedirected = useNavigationParam('isFromBookRedirected')
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const { email, password } = data
        // const user = await signInWithEmail(email, password)
        const prepData = { email, password }
        const res = await userLogin(prepData)
        setLoading(false)
        // if (user) {
        //   onAuthSuccess()
        // }
        if (res.UserStatus === 'approved') {
          OneSignal.setExternalUserId(res?.id?.toString())
          console.log('resLogin', res)
          dispatch(setLoginData(res))
          const params = `/${res?.id}`
          const bookingRes = await getBookings(params)
          dispatch(setBookings(bookingRes))
          if (serviceDetails?.id && isFromBookRedirected) {
            navigate(SCREEN_NAMES.ServiceDetails)
          } else {
            navigate(SCREEN_NAMES.Cities)
          }
        } else {
          navigate(SCREEN_NAMES.AppliedScreen)
        }
      } catch (e) {
        setLoading(false)
      }
    },
    [setLoading, dispatch, navigate, serviceDetails, isFromBookRedirected]
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
