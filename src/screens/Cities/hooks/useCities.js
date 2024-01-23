import { useEffect, useState } from 'react'

import { getCities } from '../../../services/LocationsService'

const useCities = () => {
  const [locationData, setLocationData] = useState()

  const getCitiesData = async () => {
    const res = await getCities()
    console.log(res)
    setLocationData(res)
  }

  useEffect(() => {
    getCitiesData()
  }, [])

  return {
    locationData,
  }
}

export default useCities
