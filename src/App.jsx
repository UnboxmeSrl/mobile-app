import React, {useCallback, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import Config from 'react-native-config';
import {OneSignal} from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
// import {Splash} from '@components/Splash';
import {NavigationContainer} from '@react-navigation/native';
import i18n from './services/i18n';
import {persistor, store} from './redux';
import {Splash} from './components';
import {navigationRef} from './services';
import RootStack from './navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './navigation/MainStack';
import {StatusBar} from 'react-native';
import {COLORS} from './constants';
import {isIos} from './utils';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${1}`;

const App = () => {
  // OneSignal Initialization
  OneSignal.initialize(Config.ONE_SIGNAL_APP_ID);

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // OneSignal.promptForPushNotificationsWithUserResponse();

  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  // Method for handling notifications received while app in foreground
  // OneSignal.setNotificationWillShowInForegroundHandler(
  //   notificationReceivedEvent => {
  //     console.log(
  //       'OneSignal: notification will show in foreground:',
  //       notificationReceivedEvent,
  //     );
  //     const notification = notificationReceivedEvent.getNotification();
  //     console.log('notification: ', notification);
  //     const data = notification.additionalData;
  //     console.log('additionalData: ', data);
  //     // // Complete with null means don't show a notification.
  //     // notificationReceivedEvent.complete(notification)
  //   },
  // );

  // // Method for handling notifications opened
  // OneSignal.setNotificationOpenedHandler(notification => {
  //   console.log('OneSignal: notification opened:', notification);
  // });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer ref={navigationRef}>
            {isIos && <StatusBar translucent barStyle={'dark-content'} />}
            <MainStack />
          </NavigationContainer>
          <Toast ref={Toast.setRef} topOffset={50} />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
