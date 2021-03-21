import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { selectCity, updateMe } from '@redux/modules/auth'

import { WizardStepCityPresenter } from './WizardStepCityPresenter'

export const WizardStepCity = ({ navigateToNextStep }) => {
  const city = useSelector(selectCity)
  const { control, handleSubmit, errors, reset } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(updateMe(values))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ city })
  }, [city, reset])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepCityPresenter {...props} />
}
