import { Api } from '../constants/api'

import Fetch from './ApiService'

export const getGenderList = async () => {
  try {
    const url = Api.PROFILE.GET_GENDER_LIST
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const userSignUp = async (data) => {
  const url = Api.PROFILE.USER_SIGN_UP
  let response
  await Fetch.postWithMedia(url, data)
    .then((res) => (response = res))
    .catch((error) => {
      console.log('🛑 Error: ', error?.response)
      response = error?.response
    })
  return response
}

export const userLogin = async (data) => {
  try {
    const url = Api.PROFILE.USER_LOGIN
    const response = await Fetch.post(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getInterestTopics = async () => {
  try {
    const url = Api.PROFILE.GET_INTEREST_TOPICS
    const response = await Fetch.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
