import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  appInfo: {},
  bookings: [],
  restaurantDetails: {},
  serviceDetails: {},
  canceledBookings: [],
  timeFrameData: {},
  socialActions: [],
  // allNearerRestaurants: {},
  allRestaurants: {},
  selectedResCoordinates: null,
};

const RestaurantSlice = createSlice({
  initialState: initialState,
  name: sliceNames.restaurantSlice,
  reducers: {
    setAppInfo: (state, actions) => {
      state.appInfo = actions?.payload;
      console.log('appinfo_RestaurantSlice', state.appInfo);
    },
    setBookings: (state, actions) => {
      state.bookings = actions?.payload;
    },
    setRestaurantDetails: (state, actions) => {
      state.restaurantDetails = actions?.payload;
    },
    setServiceDetails: (state, actions) => {
      state.serviceDetails = actions?.payload;
    },
    setCanceledBookings: (state, actions) => {
      state.canceledBookings = actions?.payload;
    },
    setTimeFrameData: (state, actions) => {
      state.timeFrameData = actions?.payload;
    },
    setSocialActions: (state, actions) => {
      state.socialActions = actions.payload;
    },
    resetRestaurantSlice: (state, actions) => {
      state.bookings = [];
      state.canceledBookings = [];
    },
    // setNearerRestaurants: (state, {payload}) => {
    //   state.allNearerRestaurants = {
    //     ...payload.reduce((prev, curr) => ({...prev, [curr?.id]: curr}), {}),
    //   };
    // },
    setAllRestaurants: (state, {payload}) => {
      state.allRestaurants = {
        ...payload.reduce((prev, curr) => ({...prev, [curr?.id]: curr}), {}),
      };
    },
    setSelectedResCoordinates: (state, {payload}) => {
      state.selectedResCoordinates = payload;
    },
  },
});

export const {
  setRestaurantDetails,
  setServiceDetails,
  setAppInfo,
  setBookings,
  setCanceledBookings,
  setTimeFrameData,
  setSocialActions,
  resetRestaurantSlice,
  // setNearerRestaurants,
  setAllRestaurants,
  setSelectedResCoordinates,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;

export const selectAppInfo = createDraftSafeSelector(
  [state => state.restaurantSlice.appInfo],
  appInfo => appInfo,
);
export const selectAllRestaurantsState = createDraftSafeSelector(
  [state => state.restaurantSlice.allRestaurants],
  restaurantsObject => restaurantsObject,
);
export const selectAllRestaurants = createDraftSafeSelector(
  [selectAllRestaurantsState],
  restaurantsData => Object.values(restaurantsData || {}),
);

// export const selectAllNearbyRestaurants = createDraftSafeSelector(
//   [selectAllNearbyRestaurantsState],
//   restaurantsObject => Object.values(restaurantsObject || {}),
// );
