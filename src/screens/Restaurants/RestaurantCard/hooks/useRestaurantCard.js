import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setRestaurantDetails} from '../../../../redux';
import {navigate} from '../../../../services';

const useRestaurantCard = () => {
  const dispatch = useDispatch();

  const handleCardPress = item => {
    dispatch(setRestaurantDetails(item));
    navigate(SCREEN_NAMES.RestaurantDetails);
  };

  return {
    handleCardPress,
  };
};

export default useRestaurantCard;
