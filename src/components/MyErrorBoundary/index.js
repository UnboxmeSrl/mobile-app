import React from 'react'
import 'react-native-gesture-handler'
import crashlytics from '@react-native-firebase/crashlytics'

import { logger } from '@services/logger'

class MyErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logger.error('MyErrorBoundary', { error, errorInfo })
    crashlytics().recordError(error)
  }

  render() {
    return this.props.children
  }
}

export default MyErrorBoundary
