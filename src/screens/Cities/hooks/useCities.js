import { useEffect, useState } from 'react'

import { getCities } from '../../../services/LocationsService'

const useCities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [locationData, setLocationData] = useState()

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
  }
}

export default useCities
