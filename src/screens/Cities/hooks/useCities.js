import { useEffect, useState } from 'react'
import { getCities } from '../../../services/LocationsService'

const useCities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [locationData, setLocationData] = useState()
  const [refreshing, setRefreshing] = useState(false)

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
    getCitiesData()
  }, [])

  return {
    isLoading,
    locationData,
    refreshing,
    onRefresh,
  }
}

export default useCities
