import { Api } from '../constants'

import Fetch from './ApiService'

export const getOtp = async (data) => {
  try {
    if (data) {
      const url = Api.SIGN_UP_WITH_EMAIL.GET_OTP
      console.log(data, url)
      const response = await Fetch.post(url, data)
      return response
    }
  } catch (error) {
    console.log(error)
  }
}
export const verifyOtp = async (data) => {
  try {
    if (data) {
      const url = Api.SIGN_UP_WITH_EMAIL.VERIFY_OTP
      console.log(data, url)
      const response = await Fetch.post(url, data)
      return response
    }
  } catch (error) {
    console.log(error)
  }
}
