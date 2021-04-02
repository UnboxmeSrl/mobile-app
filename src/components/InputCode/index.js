import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import styled from 'styled-components/native'

import InputDateAndroid from '@components/InputDate/index'
import { BodyText, H2, TinyText } from '@components/Text'
import { COLORS, FONTS } from '@const'

const WRAPPER_HEIGHT = 54
const INPUT_HEIGHT = 44

const CELL_COUNT = 6

export const InputCode = ({ control, name, errors, rules, value }) => {
  const { t } = useTranslation()
  const ref = useBlurOnFulfill({ cellCount: CELL_COUNT, value })
  const errorKey = errors[name]?.message
  const errorMessage = t(`errors.${errorKey}`)
  return (
    <>
      <InputWrapper>
        <Controller
          control={control}
          name={name}
          render={({ onChange, value, setValue }) => {
            const [props, getCellOnLayoutHandler] = useClearByFocusCell({
              setValue: onChange,
              value,
            })
            return (
              <CodeField
                ref={ref}
                {...props}
                cellCount={CELL_COUNT}
                onChangeText={onChange}
                onSubmitEditing={() => {
                  ref.current.blur()
                }}
                renderCell={({ index, symbol, isFocused }) => (
                  <Cell isFocused={isFocused} key={index} onLayout={getCellOnLayoutHandler(index)}>
                    <H2>{symbol}</H2>
                  </Cell>
                )}
                value={value}
              />
            )
          }}
          rules={rules}
        />
        {errorKey ? <ErrorText numberOfLines={1}>{errorMessage}</ErrorText> : null}
      </InputWrapper>
    </>
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
const ErrorText = styled(TinyText)`
  color: ${COLORS.error};
  margin-top: 6px;
  text-align: right;
`

const Cell = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 10px;
  border-width: ${({ isFocused }) => (isFocused ? 2 : 0)};
  height: 72px;
  justify-content: center;
  width: 48px;
`
