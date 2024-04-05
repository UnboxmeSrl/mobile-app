import { navigate } from '@services'
import { useDispatch } from 'react-redux'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setServiceDetails } from '../../../../redux/slices/restaurantSlice'

const useServiceCard = (item) => {
  const dispatch = useDispatch()
  const handleCardPress = (item) => {
    dispatch(setServiceDetails(item))
    navigate(SCREEN_NAMES.ServiceDetails)
  }

  return {
    handleCardPress,
  }
}

export default useServiceCard
