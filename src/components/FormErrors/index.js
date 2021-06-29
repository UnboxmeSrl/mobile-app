import React from 'react'
import { useTranslation } from 'react-i18next'

import { InputError } from '@components/InputError'

export const FormErrors = ({ errors }) => {
  const { t } = useTranslation()
  const keys = Object.keys(errors)

  return keys.map((key) => <InputError>{t(`errors.${errors[key]?.message}`)}</InputError>)
}
