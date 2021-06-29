import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { WizardStepCodePresenter } from '@components/WizardStepCode/WizardStepCodePresenter'
import {
  _fullName,
  _username,
  _wizardCode,
  selectFullName,
  selectUsername,
  selectWizardCode,
  updateMe,
} from '@redux/modules/auth'

export const WizardStepCode = ({ navigateToNextStep }) => {
  const wizardCode = useSelector(selectWizardCode)
  const { control, handleSubmit, errors, reset, watch } = useForm()
  const dispatch = useDispatch()
  const codeValue = watch(_wizardCode)

  const onSubmit = async (values) => {
    const code = values[_wizardCode]
    if (code) {
      dispatch(updateMe(values))
    }
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)

  useEffect(() => {
    reset({ [_wizardCode]: wizardCode })
  }, [reset, wizardCode])
  const buttonTKey = codeValue ? 'next' : 'code.continueWithout'
  const props = {
    buttonTKey,
    control,
    errors,
    onPress,
  }
  return <WizardStepCodePresenter {...props} />
}
