import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import {
  _agencyName,
  _isAgency,
  selectAgencyName,
  selectIsAgency,
} from '@redux/modules/auth'

import { updateMe } from '../../firestore/updateMe'

import { WizardStepAgencyPresenter } from './WizardStepAgencyPresenter'

export const WizardStepAgency = ({ navigateToNextStep }) => {
  const isAgency = useSelector(selectIsAgency)
  const agencyName = useSelector(selectAgencyName)
  const { control, handleSubmit, errors, reset, watch } = useForm()
  const isAgencyValue = watch(_isAgency)

  const onSubmit = async (values) => {
    await updateMe({ payload: values, upsert: true })
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_agencyName]: agencyName, [_isAgency]: isAgency })
  }, [agencyName, isAgency])

  const props = {
    control,
    errors,
    isAgencyValue,
    onPress,
  }
  return <WizardStepAgencyPresenter {...props} />
}
