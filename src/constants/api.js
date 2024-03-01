export const BASE_URL = 'https://xbut-eryu-hhsg.f2.xano.io'

export const Api = {
  LOCATIONS: {
    CATEGORIES: `${BASE_URL}/api:bwh6Xc5O/category_venues_turbo`,
    CITIES: `${BASE_URL}/api:WVfdccpj/cities`,
    CITY_WISE_RESTAURANTS: `${BASE_URL}/api:bwh6Xc5O/getRestaurantByCity`,
    GET_SERVICES: `${BASE_URL}/api:bwh6Xc5O/getServicesForRestaurant`,
    GET_SERVICE_CATEGORIES: `${BASE_URL}/api:bwh6Xc5O/serviceCategories`,
    RESTAURANTS: `${BASE_URL}/api:WVfdccpj/restaurant`,
  },
  PROFILE: {
    GET_GENDER_LIST: `${BASE_URL}/api:bwh6Xc5O/gender_list`,
    USER_LOGIN: `${BASE_URL}/api:bwh6Xc5O/user_login`,
    USER_SIGN_UP: `${BASE_URL}/api:bwh6Xc5O/signup`,
    GET_INTEREST_TOPICS: `${BASE_URL}/api:bwh6Xc5O/interest_topics`,
  },
  RESTAURANTS: {
    ADD_BOOKING: `${BASE_URL}/api:bwh6Xc5O/add_new_booking`,
    GET_BOOKINGS: `${BASE_URL}/api:bwh6Xc5O/get_bookings`,
    GET_TIME_FRAMES: `${BASE_URL}/api:bwh6Xc5O/get_timeframes_turbo`,
    UPDATE_ACTION: `${BASE_URL}/api:bwh6Xc5O/update_booking`,
    UPDATE_ACTION_DIARY: `${BASE_URL}/api:bwh6Xc5O/update_content`,
    CANCEL_BOOKING: `${BASE_URL}/api:bwh6Xc5O/cancel_booking`,
    GET_ALL_CANCELED_BOOKINGS: `${BASE_URL}/api:bwh6Xc5O/canceled_booking`,
    GET_DIARY_ACTIONS: `${BASE_URL}/api:bwh6Xc5O/diary_action_turbo`,
  },
  CONTENT: {
    GET_BOOKING_FOR_CONTENT: `${BASE_URL}/api:bwh6Xc5O/get_booking_for_content`,
    UPDATE_CONTENT_URL: `${BASE_URL}/api:bwh6Xc5O/update_content_url`,
  },
}
