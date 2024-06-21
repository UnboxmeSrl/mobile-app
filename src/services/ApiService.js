import axios from 'axios';
import {showToastError} from './toast';
import {store} from '../redux';

export default {
  // get: async (url, {axiosSecure = false, ...options} = {}) => {
  //   const token = store.getState().authSlice.loginData?.token || null;
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     'Accept-Language': 'en-US',
  //   };
  //   if (!token && axiosSecure) {
  //     // signIn('redirectToLogin')
  //     return {succeeded: false, messages: ['logout']};
  //   }
  //   if (axiosSecure && token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }

  //   // options.url = url
  //   options.headers = {...headers};
  //   console.log(token);
  //   // let response = await axios.get(url, options);
  //   const response = await axios.get(url, options).catch(err => {
  //     showToastError(err);
  //   });
  //   // const response = await axios.get(url, options)
  //   console.log('response', response);
  //   return response?.data;
  // },

  get: async (url, options = {}) => {
    options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'en-US',
      ...(options?.headers || {}),
    };

    // console.log('URL: ' + url);
    const response = await axios.get(url, options).catch(err => {
      console.log('error', err);
      // showToastError(err);
    });
    // const response = await axios.get(url, options)
    // console.log('response', response);
    return response?.data;
  },

  post: async (url, data) => {
    const options = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    };
    // console.log('POST request:', url, JSON.stringify(data));
    const response = await axios.post(url, data, options).catch(err => {
      console.log('response_POST', response);
      // showToastError(err);
      console.log('🚀 ~ post: ~ error:', JSON.stringify(err));
    });
    return response?.data;
  },
  postMedia: async (url, data) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.put(url, data, options).catch(err => {});
    return response?.data;
  },
  postWithMedia: async (url, data) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    // console.log(url, data)
    const response = await axios.post(url, data, options).catch(err => {
      console.log('signupCatchError', err);
    });
    console.log('signupResponse', response);
    return response?.data;
  },

  put: async (url, data) => {
    let response;
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    if (data === '') {
      // console.log(url)
      response = await axios.put(url).catch(err => {
        // showToastError(err);
      });
    } else {
      console.log(url, data);
      response = await axios.put(url, data, options).catch(err => {
        // showToastError(err);
      });
      // console.log('Response: ' + response);
    }

    return response?.data;
  },

  delete: async url => {
    const response = await axios.delete(url).catch(err => {
      // showToastError(err);
    });
    return response?.data;
  },
};
