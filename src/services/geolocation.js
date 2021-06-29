import { GOOGLE_CONFIG_AUTH } from '@const'

export const getIpLocation = async () => {
  const res = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_CONFIG_AUTH.maps}`, {
    method: 'POST',
  })
  const json = await res.json()
  return json
}
