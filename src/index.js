import React from 'react'
import { I18nextProvider } from 'react-i18next'
import Config from 'react-native-config'
import { ReduxNetworkProvider } from 'react-native-offline'
import OneSignal from 'react-native-onesignal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import { PersistGate } from 'redux-persist/integration/react'

import { AppGlobalHooks } from '@components/AppGlobalHooks'
import MyErrorBoundary from '@components/MyErrorBoundary'
import { Splash } from '@components/Splash'
import { StyledStatusBar } from '@components/StatusBar'
import { ThemeProvider } from '@components/ThemeProvider'
import NavigationContainer from '@nav/NavigationContainer'
import { persistor, store } from '@redux/store'
import i18n from '@services/i18n'
import DeviceInfo from 'react-native-device-info'
import { verticalScale } from 'react-native-size-matters'

//
// const db = firestore()
// db.settings({ host: 'localhost:8080', ssl: false })
//
// auth().useEmulator('http://localhost:9099')

const App = () => {
  // OneSignal Initialization
  OneSignal.setAppId(Config.ONE_SIGNAL_APP_ID)

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  OneSignal.promptForPushNotificationsWithUserResponse()

  // Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent)
    const notification = notificationReceivedEvent.getNotification()
    console.log('notification: ', notification)
    const data = notification.additionalData
    console.log('additionalData: ', data)
    // // Complete with null means don't show a notification.
    // notificationReceivedEvent.complete(notification)
  })

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification)
  })

  return (
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
}

export default App
