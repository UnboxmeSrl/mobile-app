import React from 'react'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { COLORS } from '@const'

export const LabelValue = ({ label, labelTKey, value, valueTKey, translations }) => {
  return (
    <Row>
      <Label postfix={':'} tKey={labelTKey}>
        {label}
      </Label>
      <Value tKey={valueTKey} translations={translations}>
        {value}
      </Value>
    </Row>
  )
}

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`
const Label = styled(TinyText)`
  color: ${COLORS.primaryDark};
  margin-right: 4px;
`
const Value = styled(TinyText)`
  margin-right: 2px;
`
