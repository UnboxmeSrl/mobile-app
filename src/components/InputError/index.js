import React from 'react'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { COLORS } from '@const'

export const InputError = styled(TinyText)`
  color: ${COLORS.error};
  margin-top: 6px;
  text-align: right;
`
