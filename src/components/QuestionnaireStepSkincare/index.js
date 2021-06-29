import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { isNil, not, pipe } from 'ramda'

import { _skincareRoutine, selectSkincareRoutine, updateQuestionnaire } from '@redux/modules/auth'

import { QuestionnaireStepSkincarePresenter } from './QuestionnaireStepSkincarePresenter'

export const QuestionnaireStepSkincare = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, reset } = useForm()
  const defaultValue = useSelector(selectSkincareRoutine)
  const dispatch = useDispatch()
  const field = _skincareRoutine

  const onSubmit = async (payload) => {
    dispatch(updateQuestionnaire(field, payload[field]))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const value = watch(field)
  const hasValue = pipe(isNil, not)(value)

  useEffect(() => {
    reset({ [field]: defaultValue })
  }, [defaultValue, reset])

  const props = {
    control,
    defaultValue,
    errors,
    field,
    hasValue,
    onPress,
  }
  return <QuestionnaireStepSkincarePresenter {...props} />
}
