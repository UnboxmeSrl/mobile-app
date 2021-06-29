import React, { useCallback, useContext, useMemo, useState } from 'react'
import { isEmpty, isNil } from 'ramda'

import { FormTaskPresenter } from '@components/FormTask/FormTaskPresenter'

const INITIAL_VALUE = ''
export const FormTask = () => {
  const [value, setValue] = useState(INITIAL_VALUE)
  const [result, setResult] = useState([])
  const onSubmit = useCallback(() => {
    if (isEmpty(value) || isNil(value)) {
    } else {
      setResult([...result, value])
      setValue(INITIAL_VALUE)
    }
  }, [value, setResult, result, setValue])

  const props = {
    onChangeText: setValue,
    onSubmit,
    result,
    value,
  }
  return <FormTaskPresenter {...props} />
}
