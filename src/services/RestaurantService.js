import {Api} from '../constants';
import Fetch from './ApiService';

export const getTimeFrames = async params => {
  try {
    const url = Api.RESTAURANTS.GET_TIME_FRAMES + params;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addRestaurantBooking = async data => {
  try {
    const url = Api.RESTAURANTS.ADD_BOOKING;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = async params => {
  try {
    const url = Api.RESTAURANTS.GET_BOOKINGS + params;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateActionDiary = async (params, data) => {
  try {
    const url = Api.RESTAURANTS.UPDATE_ACTION_DIARY + params;
    const response = await Fetch.put(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAction = async (params, data) => {
  try {
    const url = Api.RESTAURANTS.UPDATE_ACTION + params;
    const response = await Fetch.put(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async params => {
  try {
    const url = Api.RESTAURANTS.CANCEL_BOOKING + params;
    const response = await Fetch.put(url, '');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCanceledBookings = async params => {
  try {
    const url = Api.RESTAURANTS.GET_ALL_CANCELED_BOOKINGS + params;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDiaryActions = async () => {
  try {
    const url = Api.RESTAURANTS.GET_DIARY_ACTIONS;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllActions = async params => {
  try {
    const url = Api.RESTAURANTS.GET_ALL_ACTIONS;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getNearerRestaurants = async data => {
  try {
    const url = Api.RESTAURANTS.GET_NEARER_RESTAURANT;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchRestaurants = async params => {
  try {
    const url = Api.RESTAURANTS.SEARCH_RESTAURANTS;
    const response = await Fetch.get(url, {params});
    if (response?.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
