import firebase from '@react-native-firebase/app';
import {NavigationContainer} from '@react-navigation/native';
import {Mixpanel} from 'mixpanel-react-native';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {StatusBar} from 'react-native';
import Config from 'react-native-config';
import 'react-native-gesture-handler';
import {OneSignal} from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './navigation/MainStack';
import {persistor, store} from './redux';
import {navigationRef} from './services';
import i18n from './services/i18n';
import {isIos} from './utils';
import analytics from '@react-native-firebase/analytics';

// Set up an instance of Mixpanel
const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Config.MIXPANEL_TOKEN,
  trackAutomaticEvents,
);

// Initialize Mixpanel
mixpanel.init();

const App = () => {
  // Firebase config object
  const firebaseConfig = {
    apiKey: isIos
      ? Config.FIREBASE_IOS_APP_API_KEY
      : Config.FIREBASE_ANDROID_APP_API_KEY,
    authDomain: 'claris.firebaseapp.com',
    projectId: Config.FIREBASE_PROJECT_ID,
    appId: isIos ? Config.FIREBASE_IOS_APP_ID : Config.FIREBASE_ANDROID_APP_ID,
  };

  console.log('Firebase Configurations: ', JSON.stringify(firebaseConfig));

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

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

  const routeNameRef = React.useRef();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current =
                navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;
              // console.log('Current route: ' + currentRouteName);

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }
              routeNameRef.current = currentRouteName;
            }}>
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
