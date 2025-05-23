export const BASE_URL = 'https://xbut-eryu-hhsg.f2.xano.io';

export const Api = {
  LOCATIONS: {
    CATEGORIES: `${BASE_URL}/api:bwh6Xc5O/category_venues_turbo`,
    CITIES: `${BASE_URL}/api:WVfdccpj/cities`,
    CITY_WISE_RESTAURANTS: `${BASE_URL}/api:bwh6Xc5O/getRestaurantByCity`,
    GET_RESTAURANT_DETAILS: `${BASE_URL}/api:bwh6Xc5O/get_restaurant_and_service`,
    GET_SPONSORED_RESTAURANTS: `${BASE_URL}/api:bwh6Xc5O/get_sponsored_restaurant`,
    GET_SERVICE_CATEGORIES: `${BASE_URL}/api:bwh6Xc5O/serviceCategories`,
    GET_SERVICE_DEALS_LEFT: `${BASE_URL}/api:bwh6Xc5O/get_deal_left`,
    RESTAURANTS: `${BASE_URL}/api:WVfdccpj/restaurant`,
  },
  PROFILE: {
    GET_USER_APPROVAL_STATUS: `${BASE_URL}/api:bwh6Xc5O/getUserStatus`,
    ADD_INFLUENCER_TYPE: `${BASE_URL}/api:bwh6Xc5O/social_account`,
    GET_GENDER_LIST: `${BASE_URL}/api:bwh6Xc5O/gender_list`,
    GET_INTEREST_TOPICS: `${BASE_URL}/api:bwh6Xc5O/interest_topics`,
    GET_USER_PROFILE: `${BASE_URL}/api:bwh6Xc5O/user_turbo_profile`,
    // GET_USER_PROFILE: `${BASE_URL}/api:bwh6Xc5O/user_turbo`,
    USER_LOGIN: `${BASE_URL}/api:bwh6Xc5O/user_login`,
    FORGOT_PASSWORD: `${BASE_URL}/api:bwh6Xc5O/influencer/forgot-password`,
    USER_PROFILE_PIC_UPDATE: `${BASE_URL}/api:bwh6Xc5O/update_profile_pic`,
    USER_PROFILE_UPDATE: `${BASE_URL}/api:bwh6Xc5O/update_user_turbo`,
    USER_SIGN_UP: `${BASE_URL}/api:bwh6Xc5O/user/signup`,
    DELETE_USER_ACCOUNT: `${BASE_URL}/api:bwh6Xc5O/delete_account`,
    GET_EXPERIENCE_LEVELS: `${BASE_URL}/api:bwh6Xc5O/experience_levels`,
    SAVE_USER_DEVICE_INFO: `${BASE_URL}/api:bwh6Xc5O/save_user_device_info`,
  },
  RESTAURANTS: {
    // ADD_BOOKING_02: `${BASE_URL}/api:bwh6Xc5O/add_new_booking`,
    ADD_BOOKING: `${BASE_URL}/api:bwh6Xc5O/add_new_booking`,
    CANCEL_BOOKING: `${BASE_URL}/api:bwh6Xc5O/cancel_booking`,
    GET_ALL_CANCELED_BOOKINGS: `${BASE_URL}/api:bwh6Xc5O/canceled_booking`,
    GET_BOOKINGS: `${BASE_URL}/api:bwh6Xc5O/get_bookings`,
    GET_DIARY_ACTIONS: `${BASE_URL}/api:bwh6Xc5O/diary_action_turbo`,
    GET_TIME_FRAMES: `${BASE_URL}/api:bwh6Xc5O/get_timeframes_turbo`,
    // TODO: Create endpoint for venue app to fetch correct timeframes
    GET_TIME_FRAMES_HOTFIX: `${BASE_URL}/api:bwh6Xc5O/venue/getdeals`,
    UPDATE_ACTION: `${BASE_URL}/api:bwh6Xc5O/update_booking`,
    UPDATE_ACTION_DIARY: `${BASE_URL}/api:bwh6Xc5O/update_content`,
    GET_ALL_ACTIONS: `${BASE_URL}/api:bwh6Xc5O/actions_turbo`,
    GET_NEARER_RESTAURANT: `${BASE_URL}/api:bwh6Xc5O/influencer/restaurant_turbo/location`,
    GET_ALL_RESTAURANTS: `${BASE_URL}/api:bwh6Xc5O/restaurant_turbo_venues/list`,
    SEARCH_RESTAURANTS: `${BASE_URL}/api:bwh6Xc5O/influencer/restaurant_names`,
    // GET_RESTAURANT_OWNERS: `${BASE_URL}/api:bwh6Xc5O/get_restaurant_owners`,
    GET_RESTAURANT_OWNERS: `${BASE_URL}/api:bwh6Xc5O/get_restaurant_owner`,
    GET_APP_INFO: `${BASE_URL}/api:bwh6Xc5O/app_description`,

    UPDATE_BOOKING: `${BASE_URL}/api:bwh6Xc5O/update_booking_location`,
  },
  CONTENT: {
    GET_BOOKING_FOR_CONTENT: `${BASE_URL}/api:bwh6Xc5O/get_booking_for_content_new`,
    UPDATE_CONTENT_URL: `${BASE_URL}/api:bwh6Xc5O/update_content_url`,
  },
  SIGN_UP_WITH_EMAIL: {
    GET_OTP: `${BASE_URL}/api:bwh6Xc5O/otp/email`,
    VERIFY_OTP: `${BASE_URL}/api:bwh6Xc5O/otp/verification`,
  },
  SIGN_UP_WITH_PHONE: {
    GET_OTP: `${BASE_URL}/api:bwh6Xc5O/otp/number`,
  },
  TUTORIALS: {
    GET_TUTORIALS_LIST: `${BASE_URL}/api:bwh6Xc5O/tutorials_info`,
  },
};
