import {useCallback, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {setSelectedChannel} from '../Stores/slices/chat.slice';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {chatClient} from './useChatClient';
import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../constants';
import {requestUserPermission} from '../utils/firebaseHelper';
import {setSelectedChannel} from '../redux';

export const processNotification = async remoteMessage => {
  if (!chatClient || !chatClient.userID) {
    // Generate a development token for the user (ensure your backend supports this securely for production)
    const token = chatClient.devToken(remoteMessage.data.receiver_id);

    try {
      await chatClient.connectUser({id: remoteMessage.data.receiver_id}, token);
    } catch (error) {
      console.error('Failed to connect user:', error);
      return;
    }
  }
  const message = await chatClient.getMessage(remoteMessage.data?.id);
  const {stream, ...rest} = remoteMessage.data ?? {};
  const data = {...rest, ...stream};

  const channelId = await notifee.createChannel({
    id: 'chat-messages',
    name: 'Chat Messages',
  });

  await notifee.displayNotification({
    title:
      remoteMessage.notification?.title ||
      `New message from ${message.message.user?.name}`,
    body: message.message.text,
    data,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
};

const useNotification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevNotificationId = useRef('');

  const handleNotificationInteraction = useCallback(
    async event => {
      try {
        const {type, detail} = event;
        if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
          // Extract channel ID and navigate to the chat screen
          const channelId = detail.notification.data.channel_id;
          const message = await chatClient.getMessage(
            detail.notification.data?.id,
          );

          const channel = chatClient.channel('messaging', channelId, {
            name: message.message.channel?.name || 'No Name Found',
            members: [
              detail.notification.data.id,
              detail.notification.data.receiver_id,
            ],
          });
          if (channel) {
            dispatch(setSelectedChannel(channel));
            navigation.navigate(SCREEN_NAMES.ChatRoom);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, navigation],
  );

  useEffect(() => {
    requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      // Handle foreground notification
      if (prevNotificationId.current === remoteMessage.data?.id) {
        return;
      }
      prevNotificationId.current = remoteMessage.data?.id;

<<<<<<< HEAD
      // Process and display the notification
      processNotification(remoteMessage);
=======
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
>>>>>>> b90db9837e55b3551c02a962992588631398cea5
    });

    // Handle foreground notification interaction
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(
      handleNotificationInteraction,
    );

    return () => {
      unsubscribeOnMessage();
      unsubscribeForegroundEvent();
    };
  }, [handleNotificationInteraction]);

  return {};
};

export default useNotification;
