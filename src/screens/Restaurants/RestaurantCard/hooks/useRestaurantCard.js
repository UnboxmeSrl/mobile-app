import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {showToastError} from '../../../../services';

const useRestaurantCard = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInstagramFollowers = loginData?.instagram_followers;
  const userTiktokFollowers = loginData?.tiktok_followers;

  const handleCardPress = item => {
    if (loginData?.id) {
      if (
        userInstagramFollowers >= item?.min_instagram_followers &&
        userTiktokFollowers >= item?.min_tiktok_followers
      ) {
        navigation.navigate(SCREEN_NAMES.RestaurantDetails, {
          restaurantId: item.id,
        });
      } else {
        const error = {
          message: `At least ${item?.min_instagram_followers} Instagram & ${item?.min_tiktok_followers} Tiktok followers required for this service`,
          type: 'error',
        };
        showToastError(error);
      }
    } else {
      navigation.navigate(SCREEN_NAMES.RestaurantDetails, {
        restaurantId: item.id,
      });
    }
  };

  return {
    handleCardPress,
  };
};

export default useRestaurantCard;
