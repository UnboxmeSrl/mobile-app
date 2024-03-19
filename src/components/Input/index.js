import React, { useCallback, useContext, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextInputMask from 'react-native-text-input-mask'
import styled from 'styled-components/native'

import { FormContext } from '@components/Form/context'
import { Subtitle, TinyText } from '@components/Text'
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
  mask,
  labelKey,
  style,
  ...rest
}) => {
  const { getReturnKeyType, handleSubmitEditing } = useContext(FormContext)
  const { t } = useTranslation()
  const placeholder = t(placeholderKey, '')
  const errorKey = errors[name]?.message
  const errorMessage = errorKey ? t(`errors.${errorKey}`) : ''

  const { returnKeyType } = useMemo(
    () => ({
      returnKeyType: getReturnKeyType && getReturnKeyType(name),
    }),
    [getReturnKeyType, name]
  )
  const onFieldSubmit = useCallback(() => {
    handleSubmitEditing && handleSubmitEditing(name)
  }, [handleSubmitEditing, name])

  const props = {
    ...rest,
    autoFocus: false,
    blurOnSubmit: false,
    editable: !disabled,
    numberOfLines: 1,
    onSubmitEditing: onFieldSubmit,
    placeholder,
    placeholderTextColor: COLORS.black03,
    returnKeyType,
  }

  return (
    <InputWrapper disabled={disabled} style={style}>
      {labelKey ? <Label tKey={labelKey} /> : null}
      <InputContent>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ onChange, onBlur, ref, value }) =>
            mask ? (
              <MaskedInput
                {...props}
                mask={mask}
                onBlur={onBlur}
                onChangeText={(formatted, extracted) => {
                  onChange(extracted)
                }}
                ref={ref}
                value={value}
              />
            ) : (
              <TextInput value={value} {...props} onChangeText={onChange} ref={ref} />
            )
          }
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
  color: ${COLORS.achromaticBlack};
  flex: 1;
  font-family: ${FONTS.light};
  height: ${INPUT_HEIGHT}px;
  padding-horizontal: 20px;
`
const Label = styled(Subtitle)`
  color: ${COLORS.achromaticBlack};
  margin-bottom: 2px;
  margin-left: 4px;
`
const ErrorText = styled(TinyText)`
  color: ${COLORS.error};
  margin-top: 6px;
  text-align: right;
`
const MaskedInput = styled(TextInputMask)`
  flex: 1;
  font-family: ${FONTS.light};
  height: ${INPUT_HEIGHT}px;
  padding-horizontal: 20px;
`
