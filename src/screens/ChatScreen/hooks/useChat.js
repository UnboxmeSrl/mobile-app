import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {createChatByBookingDetail} from '../../../utils';

const useChat = () => {
  const [channel, setChannel] = useState(null);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);
  const [error, setError] = useState(null); // Optional: state for errors

  const route = useRoute();
  const navigation = useNavigation();
  const {bookingDetails} = route.params;

  const handleCreateChat = useCallback(async () => {
    const channelNew = await createChatByBookingDetail({
      bookingDetails,
    });
    if (channelNew) {
      setChannel(channelNew);
      setIsChannelLoaded(true);
    } else {
      setError('Failed to create channel');
    }
  }, [bookingDetails]);

  useEffect(() => {
    if (bookingDetails) {
      handleCreateChat();
    }
  }, [bookingDetails, handleCreateChat]);

  const onResetChannel = useCallback(() => {
    setChannel(null);
    setIsChannelLoaded(false);
    navigation.goBack();
  }, [navigation]);

  return {
    isChannelLoaded,
    channel,
    onResetChannel,
    error, // Optional: return error to display in the UI
  };
};

export default useChat;
