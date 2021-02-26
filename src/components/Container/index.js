import React, { ReactElement, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { BodyText } from '@components/Text'

export const Container = ({ tKey, children }) => (
  <StyledComponent>
    {tKey && <Header tKey={tKey} />}
    {children}
  </StyledComponent>
)

const StyledComponent = styled(SafeAreaView)`
  background-color: lightblue;
  flex: 1;
`
export const Title = styled(BodyText)`
  fontSize: 32px
  lineHeight: 32px
  align-self: flex-start
  borderBottomWidth: 1px
`
const Header = styled(Title)`
  marginTop: 8px
  marginLeft: 16px
`
