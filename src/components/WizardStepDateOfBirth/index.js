import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { _dobTs, selectDobTs, updateMe } from '@redux/modules/auth'

import { WizardStepDateOfBirthPresenter } from './WizardStepDateOfBirthPresenter'

export const WizardStepDateOfBirth = ({ navigateToNextStep }) => {
  const dateOfBirth = useSelector(selectDobTs)

  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: { [_dobTs]: dateOfBirth },
  })
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    console.log(values)
    const timestamp = +values[_dobTs]
    dispatch(updateMe({ [_dobTs]: timestamp }))

    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_dobTs]: dateOfBirth })
  }, [reset, dateOfBirth])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepDateOfBirthPresenter {...props} />
}
