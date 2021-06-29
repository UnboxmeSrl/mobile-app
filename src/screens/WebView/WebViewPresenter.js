import React from 'react'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'

const renderLoading = () => <ActivityIndicator />

export const WebViewPresenter = ({ source }) => (
  <WebView renderLoading={renderLoading} source={source} startInLoadingState />
)

const ActivityIndicator = styled.ActivityIndicator`
  height: 100%;
  width: 100%;
`
