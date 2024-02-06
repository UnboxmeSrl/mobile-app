import { Api } from '../constants/api'

import Fetch from './ApiService'

export const getTimeFrames = async (params) => {
  try {
    const url = Api.RESTAURANTS.GET_TIME_FRAMES + params
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
