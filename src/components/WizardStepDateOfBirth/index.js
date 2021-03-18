import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'

import { _dateOfBirth, selectDateOfBirth } from '@redux/modules/auth'

import { updateMe } from '../../firestore/updateMe'

import { WizardStepDateOfBirthPresenter } from './WizardStepDateOfBirthPresenter'

export const WizardStepDateOfBirth = ({ navigateToNextStep }) => {
  const dateOfBirth = useSelector(selectDateOfBirth)
  const date = dateOfBirth ? new Date(dateOfBirth) : new Date()
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: { [_dateOfBirth]: date },
  })
  const onSubmit = async (values) => {
    const timestamp = +values[_dateOfBirth]
    await updateMe({
      payload: { [_dateOfBirth]: timestamp },
      upsert: true,
    })
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ dateOfBirth: date })
  }, [reset, dateOfBirth])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepDateOfBirthPresenter {...props} />
}
