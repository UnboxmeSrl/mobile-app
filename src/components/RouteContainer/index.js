import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { BackArrow } from '@components/BackArrow'
import { H3, Subtitle } from '@components/Text'

const HEADER_HEIGHT = 48

export const RouteContainer = ({ tKey, children, withArrow, withPadding, style, RightButton }) => (
  <StyledComponent>
    {withArrow && (
      <Header>
        {withArrow ? <Back /> : null}
        {tKey && <HeaderTitle tKey={tKey} />}
        {RightButton ? <RightButton /> : null}
      </Header>
    )}
    <Content style={style} withPadding={withPadding}>
      {children}
    </Content>
  </StyledComponent>
)

const StyledComponent = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 8px;
`
const Header = styled.View`
  align-items: center;
  flex-direction: row;
  height: ${HEADER_HEIGHT}px;
  justify-content: center;
`
const HeaderTitle = styled(H3)`
  line-height: 48px;
`
const Back = styled(BackArrow)`
  left: 8px;
  position: absolute;
`
const Content = styled.View`
  flex: 1;
  padding-horizontal: ${({ withPadding }) => (withPadding ? 20 : 0)}px;
`
