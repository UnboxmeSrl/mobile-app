import {Api} from '../constants';
import Fetch from './ApiService';

export const getOtp = async data => {
  try {
    if (data) {
      const url = Api.SIGN_UP_WITH_EMAIL.GET_OTP;
      // console.log(data, url)
      const response = await Fetch.post(url, data);
      return response;
    }
  } catch (error) {
    console.log(error);
    return {message: error.message, success: false};
  }
};
export const verifyOtp = async data => {
  try {
    if (data) {
      const url = Api.SIGN_UP_WITH_EMAIL.VERIFY_OTP;
      // console.log(data, url)
      const response = await Fetch.post(url, data);
      console.log('res email', response);
      // response.success = true
      return response;
    }
  } catch (error) {
    console.log(error);
    return {message: error.message, success: false};
  }
};
export const getOtpByNumber = async data => {
  try {
    if (data) {
      const url = Api.SIGN_UP_WITH_PHONE.GET_OTP;
      console.log('checkPRofile', url, data);
      const response = await Fetch.post(url, data);
      return response;
    }
  } catch (error) {
    return {message: error.message, success: false};
  }
};
