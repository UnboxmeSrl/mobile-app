import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { ReduxNetworkProvider } from 'react-native-offline'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import { PersistGate } from 'redux-persist/integration/react'

import { AppGlobalHooks } from '@components/AppGlobalHooks'
import MyErrorBoundary from '@components/MyErrorBoundary'
import { Splash } from '@components/Splash'
import { StyledStatusBar } from '@components/StatusBar'
import { ThemeProvider } from '@components/ThemeProvider'
import NavigationContainer from '@nav/NavigationContainer'
import { persistor, store } from '@redux/store'
import i18n from '@services/i18n'
//
// const db = firestore()
// db.settings({ host: 'localhost:8080', ssl: false })
//
// auth().useEmulator('http://localhost:9099')

const App = () => (
  <MyErrorBoundary>
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
                <Toast ref={Toast.setRef} topOffset={50} />
              </SafeAreaProvider>
            </ThemeProvider>
          </I18nextProvider>
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  </MyErrorBoundary>
)

export default App
