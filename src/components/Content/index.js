import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Content = ({ children, style }) => (
  <ContentStyled style={style}>{children}</ContentStyled>
)

const ContentStyled = styled(SafeAreaView)`
  padding-bottom: 8px;
  padding-horizontal: 20px;
`
