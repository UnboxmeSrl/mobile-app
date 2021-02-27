import React from 'react'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'

import { ModalContainer } from '@components/ModalContainer'

const renderLoading = () => <ActivityIndicator />

export const WebViewPresenter = ({ source }) => (
  <ModalContainer>
    <WebView
      renderLoading={renderLoading}
      source={source}
      startInLoadingState
    />
  </ModalContainer>
)

const ActivityIndicator = styled.ActivityIndicator`
  height: 100%;
  width: 100%;
`
