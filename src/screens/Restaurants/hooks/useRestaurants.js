import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { getDistance } from 'geolib'

import { selectAwardPrizeCategory } from '@redux/modules/app'
import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { getCategories, getRestaurants } from '../../../services/LocationsService'
import { geolocationSetting } from '../../../utils/smallComponents'

const useRestaurants = () => {
  const categoriesIds = useSelector(selectCategoryById)
  const category = useSelector(selectAwardPrizeCategory)
  const cityData = useNavigationParam('cityData')
  const [isLoading, setIsLoading] = useState(false)
  const [restaurantsData, setRestaurantsData] = useState()
  const [filter, setFilter] = useState(0)
  const [categories, setCategories] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    getCategoriesData()
    getRestaurantsData()
    setRefreshing(false)
  }

  const [userLocation, setUserLocation] = useState({})
  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        console.log('location granted check', granted)
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return Alert.alert('Location Permission', 'Location permission denied')
        }
      } else {
        const granted = await Geolocation.requestAuthorization('whenInUse')
        if (granted !== 'granted') {
          return Alert.alert('Location Permission', 'Location permission denied')
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        },
        (err) => {
          console.log('err', err)
        },
        geolocationSetting
      )
    } catch (err) {
      Alert.alert('Location Permission', 'Something went wrong!')
    }
  }, [])
  useEffect(() => {
    console.log('check useEffect n restarant screen')
    requestLocationPermission()
  }, [requestLocationPermission])

  const getRestaurantsData = async () => {
    setIsLoading(true)
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
    }
    const res = await getRestaurants(prepData)
    setRestaurantsData(res)
    setIsLoading(false)
  }

  const sortedRestaurants = useMemo(
    () =>
      (restaurantsData || [])
        .map((rest) => {
          rest.distance = getDistance(userLocation, { latitude: rest.Latitude, longitude: rest.Longitude } || {}) / 1000
          return rest
        })
        ?.sort((a, b) => {
          return a.distance - b.distance
        }),
    [restaurantsData, userLocation]
  )

  const getCategoriesData = async () => {
    setIsLoading(true)
    const res = await getCategories()
    console.log('res cat', res)
    const addAllCategory = [{ CategoryName: 'All categories', id: 0 }, ...res?.data]

    setCategories(addAllCategory)
    setIsLoading(false)
  }

  const handleLocationPress = () => {
    navigate(SCREEN_NAMES.Cities)
  }

  const onCategoryChange = (CategoryId) => {
    setFilter(CategoryId)
  }

  useEffect(() => {
    getRestaurantsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    getCategoriesData()
  }, [])

  return {
    categories,
    categoriesIds,
    category,
    cityData,
    filter,
    handleLocationPress,
    isLoading,
    onCategoryChange,
    onRefresh,
    refreshing,
    restaurantsData: sortedRestaurants,
    setFilter,
    userLocation,
  }
}

export default useRestaurants
