import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import styled from 'styled-components/native'

import { H3 } from '@components/Text'
import { COLORS } from '@const'
import { IS_IOS, screenHeight } from '@const/common'

export const ModalContainer = ({ children, contentBased, tKey }) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Wrapper behavior={IS_IOS ? 'padding' : 'height'}>
      {contentBased ? <ContentBasedOffset /> : <FullSizeModalOffset />}
      <HandlerWrapper>
        <Handler />
      </HandlerWrapper>
      <Content bottomInset={bottom}>
        {tKey ? <Title tKey={tKey} /> : null}
        {children}
      </Content>
      <Toast position={'top'} ref={(ref) => Toast.setRef(ref)} topOffset={4} />
    </Wrapper>
  )
}

const Wrapper = styled(KeyboardAvoidingView)`
  height: ${screenHeight}px;
  justify-content: flex-end;
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
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: ${({ bottomInset }) => bottomInset + 10}px;
  padding-top: 32px;
`
const Title = styled(H3)`
  padding-horizontal: 20px;
`
