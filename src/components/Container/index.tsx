import React from 'react'
import styled from 'styled-components/native'
import {BoldText} from "@components/Text";
import {SafeAreaView} from "react-native-safe-area-context"

const StyledComponent = styled(SafeAreaView)`
  flex: 1
  alignItems: center;
`
const Title = styled(BoldText)`
  marginTop: 8px
  marginLeft: 16px
  fontSize: 32px
  lineHeight: 32px
  align-self: flex-start
`

export const Container = ({tKey, children}) => (
  <StyledComponent>
    {tKey && <Title reverted tKey={tKey} />}
    {children}
  </StyledComponent>
)
