import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

import { SelectItem } from '@components/SelectItem'

export const Select = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState(null)
  console.log('select render', defaultValue)
  useEffect(() => {
    onChange(selected)
  }, [selected])

  useEffect(() => {
    console.log({ defaultValue })
    if (!selected) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  return (
    <Wrapper>
      {options.map(({ tKeyLabel, value }) => (
        <SelectItem
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
