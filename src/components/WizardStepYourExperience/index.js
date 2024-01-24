import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { _agencyName, _experienceType, _hasAgency, selectExperienceType, updateMe } from '@redux/modules/auth'

import { setAuthData } from '../../redux/slices/authSlice'

import { WizardStepExperiencePresenter } from './WizardStepExperiencePresenter'

export const WizardStepExperience = ({ navigateToNextStep }) => {
  const experienceType = useSelector(selectExperienceType)
  const { control, handleSubmit, errors, reset } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    // dispatch(updateMe(values))
    dispatch(setAuthData({ ...values }))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_experienceType]: experienceType })
  }, [experienceType, reset])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepExperiencePresenter {...props} />
}
