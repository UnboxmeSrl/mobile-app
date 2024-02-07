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
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    console.log(url, data)
    const response = await axios.post(url, data)
    return response?.data
  },

  put: async (url, data) => {
    console.log(url, data)
    const response = await axios.put(url, data)
    return response?.data
  },
}
