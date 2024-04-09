import { useEffect, useState } from 'react'
import { getCities } from '../../../services/LocationsService'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

const useCities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [locationData, setLocationData] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const city = useSelector((state) => state.locationSlice.city)
  const isFromOtherScreen = useNavigationParam('isFromOtherScreen')
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onRefresh = () => {
    setRefreshing(true)
    getCitiesData()
    setRefreshing(false)
  }

  const getCitiesData = async () => {
    setIsLoading(true)
    const res = await getCities()
    console.log(res)
    setLocationData(res)
    setIsLoading(false)
  }

  useEffect(() => {
    if (city?.id && !isFromOtherScreen) {
      navigation.replace({
        params: { cityData: city },
        routeName: SCREEN_NAMES.Restaurants,
      })
    } else {
      getCitiesData()
    }
  }, [])

  return {
    isLoading,
    locationData,
    refreshing,
    onRefresh,
  }
}

export default useCities
