import {Api} from '../constants';
import Fetch from './ApiService';

export const getBookingForContentList = async params => {
  try {
    // const url = Api.CONTENT.GET_BOOKING_FOR_CONTENT + params ;
    const url = Api.CONTENT.GET_BOOKING_FOR_CONTENT + params; // need to revert to original route
    const response = await Fetch.get(url);
    // console.log('response_getBookingForContentList_API', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateBookingCheckinStatus = async (params, data) => {
  try {
    // const url = Api.CONTENT.GET_BOOKING_FOR_CONTENT + params ;
    const url = Api.RESTAURANTS.UPDATE_BOOKING_CHECKIN_STATUS + params; // need to revert to original route
    const response = await Fetch.putData(url, data);
    // console.log('response_updateBookingForContentList_API', response);
    return response;
  } catch (error) {
    console.log('error_updateBookingCheckinStatus', error);
  }
};

export const updateContentUrl = async (params, data) => {
  try {
    const url = Api.CONTENT.UPDATE_CONTENT_URL + params;
    const response = await Fetch.put(url, data);
    // console.log('response_updateContentUrl', response);
    return response;
  } catch (error) {
    console.log('error_updateContentUrl', error);
  }
};
