import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useRef} from 'react';
import {chatClient} from './useChatClient';

const useNotification = () => {
  const prevNotificationId = useRef();

  useEffect(() => {
    //  add listener to notifications received when on foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      if (prevNotificationId.current === remoteMessage?.data?.id) {
        return;
      }
      console.log('Notification received ok', remoteMessage);
      prevNotificationId.current = remoteMessage?.data?.id;

      const message = await chatClient.getMessage(remoteMessage.data.id);

      // create the android channel to send the notification to
      const channelId = await notifee.createChannel({
        id: 'chat-messages',
        name: 'Chat Messages',
      });

      // display the notification
      const {stream, ...rest} = remoteMessage.data ?? {};
      const data = {
        ...rest,
        ...stream, // extract and merge stream object if present
      };
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: message.message.text,
        data,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
      console.log('OKKK');
    });

    // add listener to user interactions on foreground notifications
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(
      ({detail, type}) => {
        if (type === EventType.PRESS) {
          // user has pressed notification
          const channelId = detail.notification?.data?.channel_id;
          // The navigation logic, to navigate to relevant channel screen.
          //   if (channelId) {
          //     navigationContainerRef.current?.navigate('ChannelScreen', {
          //       channelId,
          //     });
          //   }
        }
      },
    );
    return () => {
      console.log('✅');
      unsubscribeOnMessage();
      unsubscribeForegroundEvent();
    };
  }, []);

  return {};
};

export default useNotification;
