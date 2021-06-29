import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { _dobTs, selectDobTs, updateMe } from '@redux/modules/auth'

import { WizardStepDateOfBirthPresenter } from './WizardStepDateOfBirthPresenter'

export const WizardStepDateOfBirth = ({ navigateToNextStep }) => {
  const dateOfBirth = useSelector(selectDobTs)
  const { control, handleSubmit, errors, watch, setValue } = useForm({
    defaultValues: { [_dobTs]: dateOfBirth },
  })
  const onChange = (value) => {
    setValue(_dobTs, value)
  }
  const value = watch(_dobTs)
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const timestamp = +values[_dobTs]
    dispatch(updateMe({ [_dobTs]: timestamp }))

    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  const props = {
    control,
    errors,
    onChange,
    onPress,
    value,
  }
  return <WizardStepDateOfBirthPresenter {...props} />
}
