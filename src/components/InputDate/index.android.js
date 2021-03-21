import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { COLORS, FONTS } from '@const'

const WRAPPER_HEIGHT = 54
const INPUT_HEIGHT = 44

const InputDateAndroid = ({
  control,
  name,
  errors,
  rules,
  placeholderKey,
  RightIcon,
  disabled,
  onChange,
  value,
}) => {
  const [show, setShow] = useState(true)
  const { t } = useTranslation()
  const placeholder = t(placeholderKey, '')
  const errorKey = errors[name]?.message
  const errorMessage = t(`errors.${errorKey}`)

  return (
    <>
      <InputWrapper disabled={disabled} onPress={() => setShow(!show)}>
        <InputContent>
          <IconWrapper>{RightIcon}</IconWrapper>
          <Controller
            control={control}
            name={name}
            render={({ value }) => (
              <TextInput
                editable={false}
                numberOfLines={1}
                placeholder={placeholder}
                placeholderTextColor={COLORS.black03}
                value={format(value, 'dd/MM/yyyy')}
              />
            )}
            rules={rules}
          />
        </InputContent>
        {errorKey ? <ErrorText numberOfLines={1}>{errorMessage}</ErrorText> : null}
      </InputWrapper>
      {show ? (
        <DateTimePicker
          display="default"
          is24Hour={true}
          onChange={(event, value) => {
            console.log('setShow')
            setShow(false)
            if (value) {
              onChange(+value)
            }
          }}
          style={{
            opacity: 0.011,
            position: 'absolute',
            width: '100%',
          }}
          value={new Date(value)}
        />
      ) : null}
    </>
  )
}

export default InputDateAndroid

const InputWrapper = styled.TouchableOpacity`
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
const ErrorText = styled(TinyText)`
  color: ${COLORS.error};
  margin-top: 6px;
  text-align: right;
`
const IconWrapper = styled.View`
  position: absolute;
  right: 10px;
`
