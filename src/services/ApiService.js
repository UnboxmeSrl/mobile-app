import axios from 'axios';
import {showToastError} from './toast';
import Toast from 'react-native-toast-message';

export default {
  get: async (url, options = {}) => {
    options.headers = {
      'Content-Type': 'application/json',
      'Accept-Language': 'en-US',
      Accept: 'application/json',
      ...(options?.headers || {}),
    };

    const response = await axios.get(url, options).catch(err => {
      // console.error('error_getApi', url, err);
      showToastError(err);
    });
    return response?.data;
  },

  post: async (url, data) => {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.post(url, data, options).catch(err => {
      if (err?.response?.data) {
        console.log('🚀 ~ post: ~ error:', JSON.stringify(err));
      }
    });
    return response?.data;
  },

  postNew: async (url, data) => {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.post(url, data, options);
    console.log('response_post', response);
    return response;
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
    const response = await axios.post(url, data, options).catch(err => {
      console.log('err_postWithMedia', err);
      showToastError(err);
    });
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
      response = await axios.put(url).catch(err => {
        showToastError(err);
      });
    } else {
      response = await axios.put(url, data, options).catch(err => {
        showToastError(err);
      });
    }

    return response?.data;
  },

  putData: async (url, data) => {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.put(url, data, options).catch(err => {
      if (err?.response?.data) {
        console.log('🚀 ~ post: ~ error:', JSON.stringify(err));
      }
    });
    return response?.data;
  },

  delete: async url => {
    const response = await axios.delete(url).catch(err => {
      showToastError(err);
    });
    return response?.data;
  },
};
