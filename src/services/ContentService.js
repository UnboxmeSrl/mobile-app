import {Api} from '../constants';
import Fetch from './ApiService';
import {showToastError} from './toast';

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

export const getVenueDealBookingActions = async userTurboId => {
  if (!userTurboId) {
    return [];
  }

  try {
    const response = await Fetch.get(
      Api.CONTENT.GET_VENUE_DEAL_BOOKING_ACTIONS,
      {
        params: {
          user_turbo_id: userTurboId,
        },
      },
    );

    return Array.isArray(response) ? response : response?.items || [];
  } catch (error) {
    console.log(error);
    return [];
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

export const submitVenueDealActionContent = async (userActionId, data) => {
  try {
    const url = `${Api.CONTENT.SUBMIT_VENUE_DEAL_ACTION_CONTENT}/${userActionId}`;
    const response = await Fetch.postNew(url, data);
    return response?.data?.data || response?.data || {status: response?.status};
  } catch (error) {
    if (error?.response?.data) {
      const responseError =
        error?.response?.data?.message || error?.response?.data;
      showToastError({
        message:
          typeof responseError === 'string'
            ? responseError
            : JSON.stringify(responseError),
      });
      return;
    }

    showToastError({message: error?.message || 'Something went wrong'});
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
