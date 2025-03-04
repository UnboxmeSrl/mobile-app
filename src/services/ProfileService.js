import {Api} from '../constants';
import Fetch from './ApiService';

export const getUserApprovalStatus = async userId => {
  try {
    const url = Api.PROFILE.GET_USER_APPROVAL_STATUS + userId;
    // console.log('URL:', url);
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getGenderList = async () => {
  try {
    const url = Api.PROFILE.GET_GENDER_LIST;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getExperienceLevels = async () => {
  try {
    const url = Api.PROFILE.GET_EXPERIENCE_LEVELS;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const userSignUp = async data => {
  const url = Api.PROFILE.USER_SIGN_UP;

  try {
    return await Fetch.postWithMedia(url, data);
  } catch (error) {
    // console.log('🛑 Error: ', error?.response, error);
    return {
      message: 'Something went wrong',
    };
  }
};

// export const addProfilePic = async ({ formData, userID }) => {
//   try {
//     if (profile) {
//       const url = `${Api.PROFILE.USER_PROFILE_UPDATE}/${userID}`
//       const response = await Fetch.postMedia(url, formData)
//       console.log('response', response)
//       return response
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export const userLogin = async data => {
  try {
    const url = Api.PROFILE.USER_LOGIN;
    const response = await Fetch.post(url, data);

    return response;
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};
export const forgotPassword = async data => {
  try {
    const url = Api.PROFILE.FORGOT_PASSWORD;
    const response = await Fetch.post(url, data);
    console.log('resOfForgotPasswordAPI', response);
    return response;
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};

export const getInterestTopics = async () => {
  try {
    const url = Api.PROFILE.GET_INTEREST_TOPICS;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async ({formData, userID}) => {
  try {
    if (userID) {
      const url = `${Api.PROFILE.USER_PROFILE_UPDATE}/${userID}`;
      const response = await Fetch.postMedia(url, formData);
      console.log('response', response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateInfluencerType = async (params, data) => {
  try {
    const url = Api.PROFILE.ADD_INFLUENCER_TYPE + `/${params}`;
    const response = await Fetch.putData(url, data);
    console.log('response_updateInfluencerType', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const url = Api.PROFILE.GET_USER_PROFILE;
    const response = await Fetch.get(url);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAccount = async userId => {
  try {
    const url = Api.PROFILE.DELETE_USER_ACCOUNT + userId;
    const response = await Fetch.delete(url);
    console.log('delete response', response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
// export const getUserProfile = async id => {
//   try {
//     const url = `${Api.PROFILE.GET_USER_PROFILE}/${id}`;
//     const response = await Fetch.get(url);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getTutorialsList = async () => {
  try {
    const url = Api.TUTORIALS.GET_TUTORIALS_LIST;
    const response = await Fetch.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserDeviceInfo = async data => {
  try {
    const url = Api.PROFILE.SAVE_USER_DEVICE_INFO;
    const response = await Fetch.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
