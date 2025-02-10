import {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getRestaurantOwners} from '../../../services';
import {chatClient} from '../../../hooks';
import {useSelector} from 'react-redux';
import {getOwnerNames} from '../../../utils';

const useChat = () => {
  const [channel, setChannel] = useState(null);
  const [restaurantOwners, setRestaurantOwners] = useState([]);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);
  const [error, setError] = useState(null); // Optional: state for errors
  const loginData = useSelector(state => state.authSlice.loginData);

  const route = useRoute();
  const navigation = useNavigation();
  const {bookingDetails} = route.params;
  const bookingId = bookingDetails?.id;

  const formatDate = date => {
    const d = new Date(date); // Create a Date object from the input

    const day = d.getDate().toString().padStart(2, '0'); // Get the day and pad it to two digits
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-indexed) and pad it
    const year = d.getFullYear().toString().slice(2); // Get the last two digits of the year

    return `${day}-${month}-${year}`;
  };

  // Fetch restaurant owners asynchronously
  const getRestaurantOwnersData = useCallback(async () => {
    const params = `/${bookingId}`;
    const res = await getRestaurantOwners(params);
    setRestaurantOwners(res);
  }, [bookingId]);

  useEffect(() => {
    if (bookingId) {
      getRestaurantOwnersData();
    }
  }, [bookingId, getRestaurantOwnersData]);
  console.log(bookingDetails, 'bookingDetails');
  // Create channel only after the owner names are properly generated
  useEffect(() => {
    if (restaurantOwners.length > 0 && bookingDetails) {
      getOwnerNames({
        bookingDetails,
        restaurantOwners,
        formatDate,
        setChannel,
        setIsChannelLoaded,
        setError,
      });
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
