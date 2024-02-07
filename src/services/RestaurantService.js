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

export const addRestaurantBooking = async (data) => {
  try {
    const url = Api.RESTAURANTS.ADD_BOOKING
    const response = await Fetch.post(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getBookings = async (params) => {
  try {
    const url = Api.RESTAURANTS.GET_BOOKINGS + params
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateBookingContent = async (params, data) => {
  try {
    const url = Api.RESTAURANTS.UPDATE_CONTENT + params
    const response = await Fetch.put(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}
