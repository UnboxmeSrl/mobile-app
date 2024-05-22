import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';

const useRestaurantCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCardPress = item => {
    navigation.navigate(SCREEN_NAMES.RestaurantDetails, {
      restaurantId: item.id,
    });
  };

  return {
    handleCardPress,
  };
};

export default useRestaurantCard;
