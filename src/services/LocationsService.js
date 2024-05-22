import {Api} from '../constants';
import Fetch from './ApiService';

export const getCities = async () => {
  try {
    const url = Api.LOCATIONS.CITIES;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurants = async data => {
  try {
    const url = Api.LOCATIONS.CITY_WISE_RESTAURANTS;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const url = Api.LOCATIONS.CATEGORIES;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceCategories = async () => {
  try {
    const url = Api.LOCATIONS.GET_SERVICE_CATEGORIES;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantDetails = async data => {
  try {
    const url = Api.LOCATIONS.GET_RESTAURANT_DETAILS;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceDealsLeft = async data => {
  try {
    const url = Api.LOCATIONS.GET_SERVICE_DEALS_LEFT;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
