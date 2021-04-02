import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { IMAGE_FOR_SKIN, SKIN_NORMAL } from '@const/skin'
import { _skinType, selectSkincareRoutine, selectSkinType, updateQuestionnaire } from '@redux/modules/auth'

import { QuestionnaireStepSkinPresenter } from './QuestionnaireStepSkinPresenter'

const field = _skinType

export const QuestionnaireStepSkin = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, reset } = useForm()
  const defaultValue = useSelector(selectSkinType)
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

  const image = IMAGE_FOR_SKIN[skinType || SKIN_NORMAL.value]

  const props = {
    control,
    defaultValue,
    errors,
    field,
    image,
    onPress,
    skinType,
  }
  return <QuestionnaireStepSkinPresenter {...props} />
}
