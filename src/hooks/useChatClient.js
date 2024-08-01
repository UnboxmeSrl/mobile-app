import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {chatClient} from '../App';

const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const loginData = useSelector(state => state.authSlice.loginData);
  const user = {
    id: 'influencer_' + loginData?.id,
    name: loginData?.name,
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        // Ensure the token is correctly generated
        const token = chatClient.devToken(
          'influencer_' + loginData?.id?.toString(),
        );
        console.log('Token generated', token);
        await chatClient.connectUser(user, token);
        setClientIsReady(true);

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
    if (!chatClient.userID) {
      setupClient();
    }
  }, []); // Add loginData as a dependency to re-run the effect if loginData changes

  return {
    clientIsReady,
  };
};

export default useChatClient;
