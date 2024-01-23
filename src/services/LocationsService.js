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

export const getRestaurants = async (data) => {
  try {
    const url = Api.LOCATIONS.CITY_WISE_RESTAURANTS
    const response = await Fetch.post(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getCategories = async () => {
  try {
    const url = Api.LOCATIONS.CATEGORIES
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getServiceCategories = async () => {
  try {
    const url = Api.LOCATIONS.GET_SERVICE_CATEGORIES
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getServices = async (data) => {
  try {
    const url = Api.LOCATIONS.GET_SERVICES
    const response = await Fetch.post(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}
