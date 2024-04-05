import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { navigate } from '../../../services'
import { SCREEN_NAMES } from '../../../constants/navigation'

const useHome = () => {
  const city = useSelector((state) => state.locationSlice.city)

  console.log('city:', city)

  useEffect(() => {
    if (city?.id) {
      navigate({
        params: { cityData: city },
        routeName: SCREEN_NAMES.Restaurants,
      })
    } else {
      navigate({
        routeName: SCREEN_NAMES.Cities,
      })
    }
  }, [])
  return {
    city,
  }
}

export default useHome
