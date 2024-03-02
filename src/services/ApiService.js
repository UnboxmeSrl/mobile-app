import axios from 'axios'

export default {
  get: async (url) => {
    // const options = {
    //   headers: {
    //     'x-api-key': token,
    //   },
    // };
    console.log(url)
    // let response = await axios.get(url, options);
    const response = await axios.get(url)
    return response?.data
  },

  post: async (url, data) => {
    const options = {
      // headers: {
      //   // 'Content-Type': 'multipart/form-data',
      // },
    }
    console.log(url, data)
    const response = await axios.post(url, data, options)
    // console.log('🚀 ~ post: ~ response:', JSON.stringify(response))
    return response?.data
  },
  postWithMedia: async (url, data) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    console.log(url, data)
    const response = await axios.post(url, data, options)
    // console.log('🚀 ~ post: ~ response:', JSON.stringify(response))
    return response?.data
  },
  put: async (url, data) => {
    let response
    if (data === '') {
      console.log(url)
      response = await axios.put(url)
    } else {
      console.log(url, data)
      response = await axios.put(url, data)
    }

    return response?.data
  },
}
