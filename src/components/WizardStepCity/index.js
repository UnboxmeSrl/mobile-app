import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectCity } from '@redux/modules/auth'

import { updateMe } from '../../firestore/updateMe'

import { WizardStepCityPresenter } from './WizardStepCityPresenter'

export const WizardStepCity = ({ navigateToNextStep }) => {
  const city = useSelector(selectCity)
  const { control, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (values) => {
    await updateMe({ payload: values, upsert: true })
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ city })
  }, [city])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepCityPresenter {...props} />
}
