import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { _brands, selectBrands, updateQuestionnaire } from '@redux/modules/auth'

import { QuestionnaireStepBrandsPresenter } from './QuestionnaireStepBrandsPresenter'

const field = _brands

export const QuestionnaireStepBrands = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, reset } = useForm()
  const defaultValue = useSelector(selectBrands)
  const dispatch = useDispatch()

  const onSubmit = async (payload) => {
    dispatch(updateQuestionnaire(field, payload[field]))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const skinType = watch(field)

  useEffect(() => {
    reset({ [field]: defaultValue })
  }, [defaultValue, reset])

  const props = {
    control,
    defaultValue,
    errors,
    field,
    onPress,
    skinType,
  }
  return <QuestionnaireStepBrandsPresenter {...props} />
}
