import { useEffect, useState } from 'react'

import { navigate } from '@services'

import { IMAGES } from '../../../assets/images'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { getCities } from '../../../services/LocationsService'

const useCities = () => {
  const [locationData, setLocationData] = useState()

  const getCitiesData = async () => {
    const res = await getCities()
    console.log(res)
    setLocationData(res)
  }
  const handleOnCityBtnPress = async () => {
    navigate(SCREEN_NAMES.Restaurants)
  }
  useEffect(() => {
    getCitiesData()
  }, [])
  return {
    handleOnCityBtnPress,
    locationData,
  }
}

export default useCities
