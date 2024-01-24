import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { selectGender, updateMe } from '@redux/modules/auth'

import { setAuthData } from '../../redux/slices/authSlice'
import { getGenderList } from '../../services/ProfileService'

import { WizardStepGenderPresenter } from './WizardStepGenderPresenter'

export const WizardStepGender = ({ navigateToNextStep }) => {
  const { control, handleSubmit, errors, watch, register } = useForm()
  const defaultValue = useSelector(selectGender)
  const dispatch = useDispatch()
  const [genderList, setGenderList] = useState([])

  const getGenderListData = async () => {
    const res = await getGenderList()
    setGenderList(res)
  }

  const onSubmit = async (payload) => {
    // dispatch(updateMe(payload))
    dispatch(setAuthData({ ...payload }))
    navigateToNextStep()
  }
  const onPress = handleSubmit(onSubmit)
  const isSelected = watch('gender')

  useEffect(() => {
    register({ gender: defaultValue })
  }, [defaultValue, register])

  useEffect(() => {
    getGenderListData()
  }, [])

  const props = {
    control,
    defaultValue,
    errors,
    genderList,
    isSelected,
    onPress,
  }
  return <WizardStepGenderPresenter {...props} />
}
