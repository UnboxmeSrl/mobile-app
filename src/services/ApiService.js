import axios from 'axios';
import {showToastError} from './toast';
import Toast from 'react-native-toast-message';

export default {
  get: async (url, options = {}) => {
    console.log(url, ';get');
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
    console.log(url, ';post');

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

  postNew: async (url, data, options = {}) => {
    console.log(url, ';postNew');

    const requestOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options?.headers || {}),
      },
    };
    const response = await axios.post(url, data, requestOptions);
    // console.log('response_post', response);
    return response;
  },

  postMedia: async (url, data) => {
    console.log(url, ';postMedia');

    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.put(url, data, options).catch(err => {});
    return response?.data;
  },

  postWithMedia: async (url, data) => {
    console.log(url, ';postWithMedia');

    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(url, data, options).catch(err => {
      console.log(err, err.message, 'errroror');

      // if (err?.response?.data) {
      //   console.log('err_postWithMedia', JSON.stringify(err?.message));
      // }
      showToastError(err);
      throw err;
    });
    return response?.data;
  },

  put: async (url, data) => {
    console.log(url, ';put');

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
    console.log(url, ';putData');

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
    console.log(url, ';delete');

    const response = await axios.delete(url).catch(err => {
      showToastError(err);
    });
    return response?.data;
  },
};
