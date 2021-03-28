import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard } from 'react-native'
import { nth, path } from 'ramda'
import styled from 'styled-components/native/dist/styled-components.native.esm'

import { IS_IOS } from '@const/common'

import { FormContext } from './context'

export const getInputs = (children) =>
  React.Children.toArray(children).reduce((partialInputs, child) => {
    const name = path(['props', 'name'], child)
    const ref = path(['props', 'control', 'fieldsRef', 'current', name, 'ref'], child)
    const input = { name, ...ref }

    return partialInputs.concat(input)
  }, [])

export const Form = ({ children }) => {
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    setInputs(getInputs(children))
  }, [children])

  const getInputPosition = useCallback(
    (name) => {
      return inputs.findIndex((input) => input.name === name)
    },
    [inputs]
  )

  const getReturnKeyType = useCallback(
    (name) => {
      const inputPosition = getInputPosition(name)
      const keyboardType = path(['props', 'keyboardType'], inputs[inputPosition])
      const isLastInput = inputPosition === inputs.length - 1

      // to show Done button on phone-pad keyboard on ios
      const doneReturnKey = isLastInput || (IS_IOS && keyboardType === 'phone-pad')

      return doneReturnKey ? 'done' : 'next'
    },
    [getInputPosition, inputs]
  )

  const handleSubmitEditing = useCallback(
    (name) => {
      const inputPosition = getInputPosition(name)
      const isLastInput = inputPosition === inputs.length - 1
      const nextFocusableInput = nth(inputPosition + 1, inputs)

      if (nextFocusableInput) {
        console.log('focus')
        nextFocusableInput.focus()
      }
      if (isLastInput) {
        Keyboard.dismiss()
      }
    },
    [getInputPosition, inputs]
  )

  const handleBackSubmit = useCallback((name) => {
    // const inputPosition = getInputPosition(name)
    // const prevInputs = reverse(inputs.slice(0, inputPosition))
    // const prevFocusableInput = prevInputs.find(
    //   (element) =>
    //     inputRefs.current[element.name] && inputRefs.current[element.name].focus
    // )
    //
    // if (prevFocusableInput) {
    //   inputRefs.current[prevFocusableInput.name].focus()
    // }
  }, [])

  return (
    <FormContext.Provider
      value={{
        getInputPosition,
        getReturnKeyType,
        handleBackSubmit,
        handleSubmitEditing,
      }}
    >
      <Wrapper>{children}</Wrapper>
    </FormContext.Provider>
  )
}

const Wrapper = styled.View``
