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
    USER_SIGN_UP: `${BASE_URL}/api:bwh6Xc5O/signup`,
  },
}
