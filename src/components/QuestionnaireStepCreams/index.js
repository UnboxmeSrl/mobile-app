import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { IMAGE_FOR_SKIN, SKIN_NORMAL } from '@const/skin'
import { _creams, selectCreams, updateQuestionnaire } from '@redux/modules/auth'

import { QuestionnaireStepCreamsPresenter } from './QuestionnaireStepCreamsPresenter'

const field = _creams

export const QuestionnaireStepCreams = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, register } = useForm()
  const defaultValue = useSelector(selectCreams)
  const dispatch = useDispatch()

  const onSubmit = async (payload) => {
    dispatch(updateQuestionnaire(field, payload[field]))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const skinType = watch(field)

  useEffect(() => {
    register({ [field]: defaultValue })
  }, [defaultValue, register])

  const props = {
    control,
    defaultValue,
    errors,
    field,
    onPress,
    skinType,
  }
  return <QuestionnaireStepCreamsPresenter {...props} />
}
