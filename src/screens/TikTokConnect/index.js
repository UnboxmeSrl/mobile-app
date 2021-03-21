import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { TikTokModalPresenter } from './TikTokModalPresenter'

export const TikTokModal = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, errors } = useForm()

  const onSubmit = useCallback(async ({ tiktokUsername }) => {
    try {
      setLoading(true)
      // await registerEmailAccount(email, password)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }, [])

  const onPress = handleSubmit(onSubmit)

  const props = {
    control,
    errors,
    handleSubmit,
    loading,
    onPress,
  }

  return <TikTokModalPresenter {...props} />
}
