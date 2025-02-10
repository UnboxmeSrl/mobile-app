import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createChatByBookingDetail} from '../../../utils';

const useChat = () => {
  const [channel, setChannel] = useState(null);
  const [restaurantOwners, setRestaurantOwners] = useState([]);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);
  const [error, setError] = useState(null); // Optional: state for errors
  const loginData = useSelector(state => state.authSlice.loginData);

  const route = useRoute();
  const navigation = useNavigation();
  const {bookingDetails} = route.params;

  const handleCreateChat = async () => {
    const channel = await createChatByBookingDetail({
      bookingDetails,
    });
    if (channel) {
      setChannel(channel);
      setIsChannelLoaded(true);
    } else {
      setError('Failed to create channel');
    }
  };

  useEffect(() => {
    if (bookingDetails) {
      handleCreateChat();
    }
  }, [restaurantOwners, bookingDetails]);

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
