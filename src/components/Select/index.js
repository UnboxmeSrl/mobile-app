import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

import { SelectItem } from '@components/SelectItem'

export const Select = ({ options, onChange, defaultValue, Component = SelectItem }) => {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    onChange(selected)
  }, [selected])

  useEffect(() => {
    if (!selected) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  return (
    <Wrapper>
      {options.map(({ tKeyLabel, value }) => (
        <Component
          isAnySelected={selected !== null}
          isSelected={value === selected}
          key={value}
          onPress={() => setSelected(value)}
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
