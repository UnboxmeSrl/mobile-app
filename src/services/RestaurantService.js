import {Api} from '../constants';
import Fetch from './ApiService';
import {showToastError} from './toast';

// export const getTimeFrames = async (params, useHotFix = false) => {
//   try {
//     const url =
//       (!useHotFix
//         ? Api.RESTAURANTS.GET_TIME_FRAMES
//         : Api.RESTAURANTS.GET_TIME_FRAMES_HOTFIX) + params;
//     const response = await Fetch.get(url);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getTimeFrames = async params => {
  try {
    const url = Api.RESTAURANTS.GET_TIME_FRAMES + params;
    const response = await Fetch.get(url);
    // console.log('response_getTimeFrames', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addRestaurantBooking = async data => {
  console.log('check_addRestaurantBooking');
  try {
    const url = Api.RESTAURANTS.ADD_BOOKING;
    const response = await Fetch.postNew(url, data);
    return response.data;
  } catch (error) {
    if (error?.status === 400 && error?.response?.data) {
      const responseError = JSON.stringify(error?.response?.data?.message);
      showToastError({message: responseError});

      return {
        status: 400,
        message: error?.response?.data?.message || error.message,
      };
      // return {status_400: responseError};
    }
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
    const url = Api.RESTAURANTS.UPDATE_BOOKING + `/${params}`;
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
// export const getNearerRestaurants = async data => {
//   try {
//     const url = Api.RESTAURANTS.GET_NEARER_RESTAURANT;
//     const response = await Fetch.post(url, data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getAllRestaurants = async data => {
  try {
    const url = Api.RESTAURANTS.GET_ALL_RESTAURANTS;
    const response = await Fetch.get(url, data);
    // console.log('resInGetAllRestaurants', response);
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

export const getRestaurantOwners = async params => {
  try {
    const url = Api.RESTAURANTS.GET_RESTAURANT_OWNERS + params;
    const response = await Fetch.get(url);
    // console.log('resInGetAllRestaurants', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurant = async params => {
  try {
    const url = Api.RESTAURANTS.GET_RESTAURANT_OWNERS + params;
    const response = await Fetch.get(url);
    // console.log('resInGetAllRestaurants', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAppInfo = async () => {
  try {
    const url = Api.RESTAURANTS.GET_APP_INFO;
    const response = await Fetch.get(url);
    // console.log('resIn_getAppInfo', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
