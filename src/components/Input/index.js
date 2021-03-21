import React, { useCallback, useContext, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import { FormContext } from '@components/Form/context'
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
  disabled,
  ...rest
}) => {
  const { getReturnKeyType, handleSubmitEditing } = useContext(FormContext)
  const { t } = useTranslation()
  const placeholder = t(placeholderKey, '')
  const errorKey = errors[name]?.message
  const errorMessage = t(`errors.${errorKey}`)

  const { returnKeyType } = useMemo(
    () => ({
      returnKeyType: getReturnKeyType && getReturnKeyType(name),
    }),
    [getReturnKeyType, name]
  )
  const onFieldSubmit = useCallback(() => {
    handleSubmitEditing && handleSubmitEditing(name)
  }, [handleSubmitEditing, name])
  // const label = t(`labelsForFields.${name}`)

  return (
    <InputWrapper disabled={disabled}>
      {/* <Label>{label}</Label> */}
      <InputContent>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ onChange, onBlur, value, ref }) => (
            <TextInput
              {...rest}
              editable={!disabled}
              numberOfLines={1}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={onFieldSubmit}
              placeholder={placeholder}
              placeholderTextColor={COLORS.black03}
              ref={ref}
              returnKeyType={returnKeyType}
              value={value}
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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
