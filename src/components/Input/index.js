import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { COLORS, FONTS } from '@const'

const WRAPPER_HEIGHT = 54
const INPUT_HEIGHT = 44

export const Input = ({
  control,
  name,
  errors,
  rules,
  placeholderKey,
  defaultValue = '',
  RightIcon,
  ...rest
}) => {
  const { t } = useTranslation()
  const placeholder = t(placeholderKey, '')
  const errorKey = errors[name]?.message
  const errorMessage = t(`errors.${errorKey}`)
  // const label = t(`labelsForFields.${name}`)

  return (
    <InputWrapper>
      {/* <Label>{label}</Label> */}
      <InputContent>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...rest}
              numberOfLines={1}
              placeholder={placeholder}
              placeholderTextColor={COLORS.black03}
            />
          )}
          rules={rules}
        />
        {RightIcon}
      </InputContent>
      {errorKey ? <ErrorText numberOfLines={1}>{errorMessage}</ErrorText> : null}
    </InputWrapper>
  )
}

const InputWrapper = styled.View`
  height: ${WRAPPER_HEIGHT}px;
  margin-bottom: 16px;
`
const InputContent = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  box-shadow: 0px 2px 3px rgba(53, 10, 37, 0.1);
  flex-direction: row;
  padding-right: 10px;
`
const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${FONTS.light};
  height: ${INPUT_HEIGHT}px;
  padding-horizontal: 20px;
`
const Label = styled(TinyText)`
  color: ${COLORS.dark};
  margin-bottom: 2px;
  margin-left: 4px;
`
const ErrorText = styled(TinyText)`
  color: ${COLORS.error};
  margin-top: 6px;
  text-align: right;
`
