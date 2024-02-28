import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { BackArrow } from '@components/BackArrow'
import { H3, Subtitle } from '@components/Text'
import { FONTS } from '../../constants/fonts'

const HEADER_HEIGHT = 48

export const RouteContainer = ({ tKey, translations, children, withArrow, withPadding, style, RightButton }) => (
  <StyledComponent>
    {withArrow && (
      <Header>
        {withArrow ? <Back /> : null}
        {(tKey || translations) && <HeaderTitle numberOfLines={1} tKey={tKey} translations={translations} />}
        {RightButton ? (
          <RightWrapper>
            <RightButton />
          </RightWrapper>
        ) : null}
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
  font-family: ${FONTS.quicksandBold};
`
const Back = styled(BackArrow)`
  left: 8px;
  position: absolute;
`
const RightWrapper = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
`
const Content = styled.View`
  flex: 1;
  padding-horizontal: ${({ withPadding }) => (withPadding ? 20 : 0)}px;
`
