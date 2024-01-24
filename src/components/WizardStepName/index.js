import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { WizardStepNamePresenter } from '@components/WizardStepName/WizardStepNamePresenter'
import { _fullName, _username, selectFullName, selectUsername, updateMe } from '@redux/modules/auth'

import { setAuthData } from '../../redux/slices/authSlice'

export const WizardStepName = ({ navigateToNextStep }) => {
  const fullName = useSelector(selectFullName)
  const username = useSelector(selectUsername)
  const { control, handleSubmit, errors, reset } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    // dispatch(updateMe(values))
    dispatch(setAuthData({ ...values }))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_fullName]: fullName, [_username]: username })
  }, [fullName, reset, username])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepNamePresenter {...props} />
}
