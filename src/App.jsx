import notifee from '@notifee/react-native';
import analytics from '@react-native-firebase/analytics';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {Mixpanel} from 'mixpanel-react-native';
import React, {useCallback, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {Linking, StatusBar} from 'react-native';
import Config from 'react-native-config';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OneSignal} from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Chat, OverlayProvider} from 'stream-chat-react-native';
import {chatClient} from './hooks';
import MainStack from './navigation/MainStack';
import {persistor, setSelectedChannel, store} from './redux';
import {navigationRef} from './services';
import i18n from './services/i18n';
import {isIos} from './utils';
import SplashScreen from 'react-native-splash-screen';
// Set up an instance of Mixpanel
const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Config.MIXPANEL_TOKEN,
  trackAutomaticEvents,
);

// Initialize Mixpanel
mixpanel.init();

// console.log('STREAM_CHAT_API_KEY: ', Config.STREAM_CHAT_API_KEY);

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

  const routeNameRef = React.useRef();

  console.log('Firebase Configurations: ', JSON.stringify(firebaseConfig));

  // Initialize Firebase
  if (!firebase.apps.length) {
    console.log('firebase.apps.length', firebase.apps?.length, firebase.apps);
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
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
  }, []);

  const linking = {
    prefixes: [
      'https://admin.joinclaris.com/influencer/',
      'clarisinfluencer://',
    ],
    async getInitialURL() {
      // Try to get the initial URL from deep link or notification
      try {
        let message = await messaging().getInitialNotification();
        console.log('initial url1', message);
        if (message) {
          message = {
            ...message,
            notification: {
              ...message.notification,
              data: message.data,
            },
          };
        }
        console.log('message', message);
        if (!message) {
          message = await notifee.getInitialNotification();
          console.log('messageInsideNotifeeBlock', message);
        }
        if (message) {
          console.log('messageInsideHandleNotifeeBlock', message);
          return await handleNotification(message);
        }
      } catch (error) {
        console.log('Error fetching initial URL or notification:', error);
      }
    },
    subscribe(listener) {
      // Listen to incoming links from deep linking
      let subscribed = Linking.addEventListener('url', ({url}) => {
        console.log('url', url);
        return listener(url);
      });
      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(
        async remoteMessage => {
          console.log('onOpen urlSubcribe', remoteMessage);
          if (remoteMessage) {
            const url = await handleNotification({
              ...remoteMessage,
              notification: {
                ...remoteMessage.notification,
                data: remoteMessage.data,
              },
            });
            console.log('url', url);
            if (typeof url === 'string') {
              listener(url);
            }
          }
        },
      );
      return () => {
        subscribed.remove();
        unsubscribe();
      };
    },
    config: {
      screens: {
        BottomStack: {
          screens: {
            ChatRoom: 'BottomStack/ChatRoom', // Map the deep link path to the ChatRoom screen
          },
        },
      },
    },
  };
  const handleNotification = useCallback(async remoteMessage => {
    if (!remoteMessage?.notification) {
      return;
    }
    SplashScreen.hide();
    const notification = remoteMessage.notification;
    const userId = notification?.data?.receiver_id;
    const otherUserId = notification?.data?.id;
    const channelId = notification.data.channel_id;
    console.log('channelId', channelId);
    // Check if the chatClient is already connected with the user
    if (!chatClient || !chatClient.userID) {
      // Generate a development token for the user (ensure your backend supports this securely for production)
      const token = chatClient.devToken(userId);

      try {
        await chatClient.connectUser({id: userId}, token);
      } catch (error) {
        console.error('Failed to connect user:', error);
        return;
      }
    }

    const message = await chatClient.getMessage(otherUserId);
    // console.log(otherUserId, userId, notification?.data, 'notification');

    // Ensure channel creation with necessary members
    try {
      const channel = await chatClient.channel('messaging', channelId, {
        name: message.message?.channel?.name,
        members: ['owner_284', userId],
      });
      console.log(channel.state.members, 'channel noti');
      store.dispatch(setSelectedChannel(channel));
      console.log('afterstate');
      return 'https://admin.joinclaris.com/influencer/BottomStack/ChatRoom';
    } catch (error) {
      console.error('Failed to create or retrieve channel:', error);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <OverlayProvider>
            <Chat client={chatClient}>
              <I18nextProvider i18n={i18n}>
                <NavigationContainer
                  linking={linking}
                  ref={navigationRef}
                  onReady={() => {
                    routeNameRef.current =
                      navigationRef.current.getCurrentRoute().name;
                  }}
                  onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName =
                      navigationRef.current.getCurrentRoute().name;
                    console.log('Current route: ' + currentRouteName);

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
            </Chat>
          </OverlayProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
