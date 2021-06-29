import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAction } from '@hooks/common'
import { _location, selectLocation, setAppData } from '@redux/modules/app'
import { getIpLocation } from '@services/geolocation'

export const useFetchLocation = () => {
  const location = useSelector(selectLocation)
  const setData = useAction(setAppData)

  useEffect(() => {
    if (!location) {
      getIpLocation().then((data) => setAppData({ [_location]: data }))
    }
  }, [location, getIpLocation, setData])
}
