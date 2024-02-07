import { useDispatch } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setRestaurantDetails } from '../../../../redux/slices/restaurantSlice'

const useRestaurantCard = () => {
  const dispatch = useDispatch()

  const handleCardPress = (item) => {
    dispatch(setRestaurantDetails(item))
    navigate(SCREEN_NAMES.RestaurantDetails)
  }

  return {
    handleCardPress,
  }
}

export default useRestaurantCard
