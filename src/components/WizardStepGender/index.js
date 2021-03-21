import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { selectGender, updateMe } from '@redux/modules/auth'

import { WizardStepGenderPresenter } from './WizardStepGenderPresenter'

export const WizardStepGender = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, register } = useForm()
  const defaultValue = useSelector(selectGender)
  const dispatch = useDispatch()

  const onSubmit = async (payload) => {
    dispatch(updateMe(payload))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const isSelected = watch('gender')

  useEffect(() => {
    register({ gender: defaultValue })
  }, [defaultValue, register])

  const props = {
    control,
    defaultValue,
    errors,
    isSelected,
    onPress,
  }
  return <WizardStepGenderPresenter {...props} />
}
