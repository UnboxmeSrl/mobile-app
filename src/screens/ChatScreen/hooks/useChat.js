import {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getRestaurantOwners} from '../../../services';
import {chatClient} from '../../../hooks';
import {useSelector} from 'react-redux';

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

  const formatDate = (date) => {
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
      const getOwnerNames = async () => {
        try {
          // Wait for all asynchronous operations (if any) within map to complete
          // const ownerNamesArray = await Promise.all(
          //   restaurantOwners.map(async owner => {
          //     // If any async operation is needed per owner, it can go here.
          //     // For example: const additionalData = await someAsyncFunction(owner.id);
          //     return owner?.Owner_name;
          //   }),
          // );
          // Join all owner names with commas
          // const ownerNames = ownerNamesArray.join(',');
          const channelName = `${bookingDetails._restaurant_turbo.Name}:${
            bookingDetails?.user_turbo?.name || ''
          }:${formatDate(bookingDetails?.BookingDay)}`;

          // Proceed to create the channel if the name is valid
          if (channelName && channelName.trim() !== '') {
            const setupChannel = async () => {
              try {
                const newChannel = chatClient.channel('messaging', bookingId, {
                  name: channelName,
                  members: [
                    'influencer_' + bookingDetails?.user_turbo_id?.toString(),
                  ],
                });

                await newChannel.watch();

                const restaurantOwnersWithPrefix = restaurantOwners.map(
                  owner => 'owner_' + owner?.id,
                );

                // Add restaurant owners as members to the channel
                restaurantOwnersWithPrefix.forEach(owner => {
                  newChannel.addMembers([owner]);
                });

                setChannel(newChannel);
                setIsChannelLoaded(true);
              } catch (error) {
                console.error('Failed to create channel:', error);
                setError('Failed to create channel'); // Optional error handling
              }
            };

            setupChannel();
          } else {
            setError('Channel name is invalid or empty');
          }
        } catch (error) {
          console.error('Error generating owner names:', error);
          setError('Error generating owner names');
        }
      };

      getOwnerNames();
    }
  }, [restaurantOwners, bookingDetails, bookingId]);

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
