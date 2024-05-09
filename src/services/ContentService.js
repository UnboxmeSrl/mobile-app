import {Api} from '../constants';
import Fetch from './ApiService';

export const getBookingForContentList = async params => {
  try {
    const url = Api.CONTENT.GET_BOOKING_FOR_CONTENT + params;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateContentUrl = async (params, data) => {
  try {
    const url = Api.CONTENT.UPDATE_CONTENT_URL + params;
    console.log('url: ' + url);
    const response = await Fetch.put(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
