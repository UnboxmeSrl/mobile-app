import React from 'react'
import styled from 'styled-components/native'
import {BoldText} from "@components/Text";
import {SafeAreaView} from "react-native-safe-area-context"

const StyledComponent = styled(SafeAreaView)`
  flex: 1
`
export const Title = styled(BoldText)`
  fontSize: 32px
  lineHeight: 32px
  align-self: flex-start
`
const Header = styled(Title)`
  marginTop: 8px
  marginLeft: 16px
`

export const Container = ({tKey, children}) => (
  <StyledComponent>
    {tKey && <Header tKey={tKey} />}
    {children}
  </StyledComponent>
)
