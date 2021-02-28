import React, { Component } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ReduxNetworkProvider } from 'react-native-offline'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import crashlytics from '@react-native-firebase/crashlytics'
import { PersistGate } from 'redux-persist/integration/react'

import { AppGlobalHooks } from '@components/AppGlobalHooks'
import { Splash } from '@components/Splash'
import { StyledStatusBar } from '@components/StatusBar'
import { ThemeProvider } from '@components/ThemeProvider'
import NavigationContainer from '@nav/NavigationContainer'
import { persistor, store } from '@redux/store'
import i18n from '@services/i18n'
import { logger } from '@services/logger'

class App extends Component {
  componentDidCatch(error, errorInfo) {
    logger.error('componentDidCatch', { error, errorInfo })
    crashlytics().recordError(error)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReduxNetworkProvider>
            <I18nextProvider i18n={i18n}>
              <ThemeProvider>
                <SafeAreaProvider>
                  <NavigationContainer>
                    <StyledStatusBar />
                    <AppGlobalHooks />
                    <Splash />
                  </NavigationContainer>
                </SafeAreaProvider>
              </ThemeProvider>
            </I18nextProvider>
          </ReduxNetworkProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
