import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectGender, selectName } from '@redux/modules/auth'

import { updateMe } from '../../firestore/updateMe'

import { WizardStepGenderPresenter } from './WizardStepGenderPresenter'

export const WizardStepGender = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, register } = useForm()
  const defaultValue = useSelector(selectGender)
  const onSubmit = async (payload) => {
    updateMe({ payload })
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const isSelected = watch('gender')

  useEffect(() => {
    register({ gender: defaultValue })
  }, [defaultValue])

  const props = {
    control,
    defaultValue,
    errors,
    isSelected,
    onPress,
  }
  return <WizardStepGenderPresenter {...props} />
}
