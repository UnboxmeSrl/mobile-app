import React from 'react'
import 'react-native-gesture-handler'

class MyErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('error', errorInfo)
    // logger.error('MyErrorBoundary', { error, errorInfo })
    // crashlytics().recordError(error)
  }

  render() {
    return this.props.children
  }
}

export default MyErrorBoundary
