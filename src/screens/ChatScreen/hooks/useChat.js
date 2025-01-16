import {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getRestaurantOwners} from '../../../services';
import {chatClient} from '../../../hooks';

const useChat = () => {
  const [channel, setChannel] = useState(null);
  const [restaurantOwners, setRestaurantOwners] = useState([]);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const {bookingDetails} = route.params;
  const bookingId = bookingDetails?.id;
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

  useEffect(() => {
    const restaurantOwnersWithPrefix = restaurantOwners.map(
      ownerId => 'owner_' + ownerId,
    );
    const members = [
      'influencer_' + bookingDetails?.user_turbo_id?.toString(),
      // ...restaurantOwnersWithPrefix,
    ];
    const setupChannel = async () => {
      const newChannel = chatClient.channel('messaging', bookingId, {
        name: `Chat with ${bookingDetails?._offers_turbo?.Offer_Name}_${bookingId}`,
        members: members,
      });

      await newChannel.watch();
      restaurantOwnersWithPrefix.map(owner => {
        newChannel.addMembers([owner]);
      });
      // newChannel.addMembers(members);
      setChannel(newChannel);
      setIsChannelLoaded(true);
    };

    setupChannel();
  }, [
    bookingDetails?._offers_turbo?.Offer_Name,
    bookingDetails?.user_turbo_id,
    bookingId,
    restaurantOwners,
  ]);
  const onResetChannel = useCallback(() => {
    setChannel(null);
    setIsChannelLoaded(false);
    navigation.goBack();
  }, [navigation]);
  return {
    isChannelLoaded,
    channel,
    onResetChannel,
  };
};

export default useChat;
