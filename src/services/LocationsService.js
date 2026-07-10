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
    console.log('error_getRestaurants', error);
  }
};

export const getSponsoredRestaurants = async data => {
  try {
    const url = Api.LOCATIONS.GET_SPONSORED_RESTAURANTS;
    const response = await Fetch.post(url, data);
    return response || [];
  } catch (error) {
    console.log('error_getSponsoredRestaurants', error);
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

export const getPerks = async () => {
  try {
    const url = Api.LOCATIONS.GET_PERKS;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getActions = async () => {
  try {
    const url = Api.LOCATIONS.GET_ACTIONS;
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
    // console.log(
    //   'check_getRestaurantDetailsApiCall',
    //   data,
    //   JSON.stringify(response),
    // );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantDeals = async restaurantId => {
  try {
    if (!restaurantId) {
      return;
    }

    const url = `${Api.LOCATIONS.GET_RESTAURANT_DEALS}/${restaurantId}/deals`;
    const response = await Fetch.get(url);
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
