import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import styled from 'styled-components/native'

import { Input } from '@components/Input'
import { WizardStepNamePresenter } from '@components/WizardStepName/WizardStepNamePresenter'
import { selectName, selectUsername, selectUserUid } from '@redux/modules/auth'

import { updateMe } from '../../firestore/updateMe'

export const WizardStepName = ({ navigateToNextStep }) => {
  const name = useSelector(selectName)
  const username = useSelector(selectUsername)
  const { control, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (values) => {
    await updateMe({ payload: values, upsert: true })
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ name, username })
  }, [name, username])

  const props = {
    control,
    errors,
    onPress,
  }
  return <WizardStepNamePresenter {...props} />
}
