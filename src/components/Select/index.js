import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { includes, isNil } from 'ramda'
import styled from 'styled-components/native'

import { SelectItem } from '@components/SelectItem'

export const Select = ({ options, onChange, defaultValue, Component = SelectItem, style, multi }) => {
  const [selected, setSelected] = useState(defaultValue || (multi ? [] : null))

  useEffect(() => {
    onChange(selected)
  }, [selected])

  useEffect(() => {
    if (!selected) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  const onPress = useCallback(
    (value) => {
      if (multi) {
        const data = includes(value, selected) ? selected.filter((item) => item !== value) : [...selected, value]
        setSelected(data)
      } else {
        setSelected(value)
      }
    },
    [selected, multi]
  )
  const isSelected = useCallback(
    (value) => {
      return multi ? selected.includes(value) : selected === value
    },
    [multi, selected]
  )
  const isAnySelected = useMemo(() => {
    return multi ? Boolean(selected.length) : !isNil(selected)
  }, [multi, selected])

  return (
    <Wrapper style={style}>
      {options.map(({ tKeyLabel, value, image, imageActive }) => (
        <Component
          image={image}
          imageActive={imageActive}
          isAnySelected={isAnySelected}
          isSelected={isSelected(value)}
          key={value}
          onPress={() => onPress(value)}
          tKeyLabel={tKeyLabel}
          value={value}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.View`
  margin-bottom: 12px;
`
