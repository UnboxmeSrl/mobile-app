import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Linking } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import {
  _tiktokUsername,
  selectAgencyName,
  selectTiktokUsername,
  updateMe,
} from '@redux/modules/auth'

import { TikTokModalPresenter } from './TikTokModalPresenter'

export const TikTokModal = () => {
  const { control, handleSubmit, errors, reset } = useForm()
  const tiktokUsername = useSelector(selectTiktokUsername)
  const { goBack } = useNavigation()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(updateMe(values))
    goBack()
    Linking.openURL('https://vm.tiktok.com/ZSJY3DjKU')
  }

  useEffect(() => {
    reset({ [_tiktokUsername]: tiktokUsername })
  }, [reset, tiktokUsername])

  const onPress = handleSubmit(onSubmit)

  const props = {
    control,
    errors,
    handleSubmit,
    onPress,
  }

  return <TikTokModalPresenter {...props} />
}
