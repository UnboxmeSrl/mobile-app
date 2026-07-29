import {useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StreamChat} from 'stream-chat';
import Config from 'react-native-config';

export const chatClient = StreamChat.getInstance(Config.STREAM_CHAT_API_KEY);

const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const loginData = useSelector(state => state.authSlice.loginData);
  const unsubscribeTokenRefreshListenerRef = useRef();
  // console.log(loginData, 'data');
  const user = useMemo(
    () => ({
      id: 'influencer_' + loginData?.id,
      name: loginData?.name,
      image: loginData?.Profile_pic?.url,
    }),
    [loginData?.Profile_pic?.url, loginData?.id, loginData?.name],
  );
  // console.log(user, 'loginData?.Profile_pic?.url');
  // useEffect(() => {
  //   const setupClient = async () => {
  //     try {
  //       // Ensure the token is correctly generated
  //       const token = chatClient.devToken(
  //         'influencer_' + loginData?.id?.toString(),
  //       );
  //       console.log('Token generated', token);
  //       await chatClient.connectUser(user, token);

  //       // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
  //       // But in case you need the chat to load from offline storage first then you should render chat components
  //       // immediately after calling `connectUser()`.
  //       // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error(
  //           `An error occurred while connecting the user: ${error.message}`,
  //         );
  //       }
  //     }
  //   };

  //   // If the chat client has a value in the field `userID`, a user is already connected
  //   // and we can skip trying to connect the user again.
  //   if (!chatClient.userID) {
  //     setupClient();
  //   }
  // }, []); // Add loginData as a dependency to re-run the effect if loginData changes

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      // unsubscribe any previous listener
      unsubscribeTokenRefreshListenerRef.current?.();
      if (Platform.OS === 'ios') {
        // FCM cannot mint a token on iOS until APNs has handed one over.
        console.log('[stream] APNs token:', await messaging().getAPNSToken());
      }
      const token = await messaging().getToken();
      console.log('[stream] FCM token:', token);
      const push_provider = 'firebase';
      const push_provider_name = 'ClarisAndroid'; // name an alias for your push provider (optional)
      // addDevice, not setLocalDevice: this runs after connectUser, and
      // setLocalDevice throws once the websocket is open.
      // push_provider_name is meant for optional multiple providers support, see: https://getstream.io/chat/docs/react/push_providers_and_multi_bundle
      await chatClient.addDevice(token, push_provider, user.id, push_provider_name);
      console.log('[stream] device registered', user.id, token);

      await AsyncStorage.setItem('@current_push_token', token);

      const removeOldToken = async () => {
        const oldToken = await AsyncStorage.getItem('@current_push_token');
        if (oldToken !== null) {
          await chatClient.removeDevice(oldToken);
        }
      };

      unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(
        async newToken => {
          await removeOldToken();
          await chatClient.addDevice(
            newToken,
            push_provider,
            user.id,
            push_provider_name,
          );
          await AsyncStorage.setItem('@current_push_token', newToken);
        },
      );
    };

    const setupClient = async () => {
      try {
        // Ensure the token is correctly generated
        const token = chatClient.devToken(
          'influencer_' + loginData?.id?.toString(),
        );
        // console.log('Token generated', token);
        await chatClient.connectUser(user, token);

        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    const init = async () => {
      if (!loginData?.id) {
        return;
      }

      if (!chatClient.userID) {
        await setupClient();
      }

      try {
        await registerPushToken();
      } catch (error) {
        console.error('Failed to register Stream push token:', error);
      }

      setClientIsReady(true); // Add loginData as a dependency to re-run the effect if loginData changes
    };

    init();

    return async () => {
      await chatClient?.disconnectUser();
      unsubscribeTokenRefreshListenerRef.current?.();
    };
  }, [loginData?.id, user]);

  return {
    clientIsReady,
  };
};

export default useChatClient;
