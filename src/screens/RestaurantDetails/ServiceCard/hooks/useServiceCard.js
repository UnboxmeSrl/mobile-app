import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../../constants/navigation'

const useServiceCard = () => {
  const handleCardPress = (item) => {
    navigate({
      params: {
        restaurantDetails: item,
      },
      routeName: SCREEN_NAMES.RestaurantDetails,
    })
  }

  return {
    handleCardPress,
  }
}

export default useServiceCard
