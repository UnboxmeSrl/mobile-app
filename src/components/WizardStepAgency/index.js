import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  _agencyName,
  _hasAgency,
  selectAgencyName,
  selectHasAgency,
  updateMe,
} from '@redux/modules/auth'

import { WizardStepAgencyPresenter } from './WizardStepAgencyPresenter'

export const WizardStepAgency = ({ navigateToNextStep }) => {
  const hasAgency = useSelector(selectHasAgency)
  const agencyName = useSelector(selectAgencyName)
  const { control, handleSubmit, errors, reset, watch } = useForm()
  const isAgencyValue = watch(_hasAgency)
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(updateMe(values))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_agencyName]: agencyName, [_hasAgency]: hasAgency })
  }, [agencyName, hasAgency, reset])

  const props = {
    control,
    errors,
    isAgencyValue,
    onPress,
  }
  return <WizardStepAgencyPresenter {...props} />
}
