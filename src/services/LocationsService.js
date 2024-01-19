import { Api } from '../constants/api'

import Fetch from './ApiService'

export const getCities = async () => {
  try {
    const url = Api.LOCATIONS.CITIES
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
