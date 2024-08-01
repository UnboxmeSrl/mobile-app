import {useEffect, useState} from 'react';
import {chatClient} from '../../../App';
import {useRoute} from '@react-navigation/native';
import {getRestaurantOwners} from '../../../services';

const useChat = () => {
  const [channel, setChannel] = useState(null);
  const [restaurantOwners, setRestaurantOwners] = useState([]);
  const [isChannelLoaded, setIsChannelLoaded] = useState(false);
  const route = useRoute();
  const {bookingDetails} = route.params;
  const bookingId = bookingDetails?.id;

  const getRestaurantOwnersData = async () => {
    const params = `/${bookingId}`;
    const res = await getRestaurantOwners(params);
    console.log('RES OWNER', res);
    setRestaurantOwners(res);
  };

  useEffect(() => {
    getRestaurantOwnersData();
  }, [bookingId]);

  useEffect(() => {
    const restaurantOwnersWithPrefix = restaurantOwners.map(
      ownerId => 'owner_' + ownerId,
    );
    const members = [
      'influencer_' + bookingDetails?.user_turbo_id?.toString(),
      // ...restaurantOwnersWithPrefix,
    ];
    console.log('object members: ', members, bookingId);
    const setupChannel = async () => {
      const newChannel = chatClient.channel('messaging', bookingId, {
        name: `Chat with ${bookingId}`,
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
  }, [restaurantOwners]);

  return {
    isChannelLoaded,
    channel,
  };
};

export default useChat;
