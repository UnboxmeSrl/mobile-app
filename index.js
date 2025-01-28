/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {processNotification} from './src/hooks/useNotification';
messaging().setBackgroundMessageHandler(async remotemesassge => {
  // console.log(remotemesassge, 'remotemesassge');
  // const channelId = await notifee.createChannel({
  //   id: 'chat-messages',
  //   name: 'Chat Messages',
  // });
  await processNotification(remotemesassge);
  // await notifee.displayNotification({
  //   title: 'Claris',
  //   body: remotemesassge.data.channel_id,
  //   data: {...remotemesassge.data},
  //   android: {
  //     channelId,
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
  //   processNotification(remotemesassge);
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === notifee.EventType) {
    console.log('User pressed the reply button on the notification');
    // Code to handle reply action, like opening reply input or processing the reply data
  }
});

AppRegistry.registerComponent(appName, () => App);
