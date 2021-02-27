import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { H3 } from '@components/Text'
import { COLORS } from '@const'
import { screenHeight } from '@const/common'

export const ModalContainer = ({ children, contentBased, tKey }) => (
  <Wrapper>
    {contentBased ? <ContentBasedOffset /> : <FullSizeModalOffset />}
    <HandlerWrapper>
      <Handler />
    </HandlerWrapper>
    <Content>
      {tKey ? <Title tKey={tKey} /> : null}
      {children}
    </Content>
  </Wrapper>
)

const Wrapper = styled.View`
  flex: 1;
`
const FullSizeModalOffset = styled.View`
  height: ${screenHeight / 16}px;
`
const ContentBasedOffset = styled.View`
  flex: 1;
`
const HandlerWrapper = styled.View`
  align-items: center;
  height: 6px;
  margin-bottom: 10px;
  width: 100%;
`
const Handler = styled.View`
  background-color: ${COLORS.white};
  border-radius: 3px;
  height: 6px;
  width: 40px;
`

const Content = styled.View`
  background-color: white;
  border-radius: 30px;
  flex: 1;
  padding-horizontal: 20px;
  padding-top: 32px;
`
const Title = styled(H3)``
