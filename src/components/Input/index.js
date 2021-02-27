import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { COLORS } from '@const'

export const Input = ({ control, name, error, rules, placeholderKey, ...rest }) => {
  const { t } = useTranslation()
  const placeholder = t(placeholderKey, '')
  console.log(placeholder, placeholderKey)
  return (
    <InputWrapper>
      <Controller
        control={control}
        name={name}
        render={({ onChange, onBlur, value }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} {...rest} placeholder={placeholder} />
        )}
        rules={rules}
      />
      {/* {error ? <TinyText>{error}</TinyText> : false} */}
    </InputWrapper>
  )
}

const InputWrapper = styled.View`
  width: 100%;
`
const TextInput = styled.TextInput`
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  height: 44px;
  padding-left: 20px;
`
