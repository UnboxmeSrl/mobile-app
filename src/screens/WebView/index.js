import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { WebViewPresenter } from './WebViewPresenter'

export const WebViewModal = () => {
  const uri = useNavigationParam('uri')
  const source = { uri }
  return <WebViewPresenter source={source} />
}
