import axios from 'axios'
import { store } from '../redux/store'

export default {
  get: async (url, { axiosSecure = false, ...options } = {}) => {
    const token = store.getState().authSlice.loginData?.token || null
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'en-US',
    }
    if (!token && axiosSecure) {
      // signIn('redirectToLogin')
      return { succeeded: false, messages: ['logout'] }
    }
    if (axiosSecure && token) headers.Authorization = `Bearer ${token}`
    // options.url = url
    options.headers = { ...headers }
    console.log(token)
    // let response = await axios.get(url, options);
    const response = await axios.get(url, options)
    // const response = await axios.get(url, options)
    return response?.data
  },

  post: async (url, data) => {
    const options = {
      // headers: {
      //   // 'Content-Type': 'multipart/form-data',
      // },
    }
    const response = await axios.post(url, data, options)
    // console.log('🚀 ~ post: ~ response:', JSON.stringify(response))
    return response?.data
  },
  postMedia: async (url, data) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const response = await axios.put(url, data, options)
    // console.log('🚀 ~ post: ~ response:', JSON.stringify(response))
    return response?.data
  },
  postWithMedia: async (url, data) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    // console.log(url, data)
    const response = await axios.post(url, data, options)
    // console.log('🚀 ~ post: ~ response:', JSON.stringify(response))
    return response?.data
  },

  put: async (url, data) => {
    let response
    if (data === '') {
      // console.log(url)
      response = await axios.put(url)
    } else {
      // console.log(url, data)
      response = await axios.put(url, data)
    }

    return response?.data
  },
}
