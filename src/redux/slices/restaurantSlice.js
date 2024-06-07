import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  bookings: [],
  restaurantDetails: {},
  serviceDetails: {},
  canceledBookings: [],
  timeFrameData: [],
  socialActions: [],
  allNearerRestaurants: {},
  selectedResCoordinates: null,
};

const RestaurantSlice = createSlice({
  initialState: initialState,
  name: sliceNames.restaurantSlice,
  reducers: {
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
    setNearerRestaurants: (state, {payload}) => {
      state.allNearerRestaurants = {
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
  setBookings,
  setCanceledBookings,
  setTimeFrameData,
  setSocialActions,
  resetRestaurantSlice,
  setNearerRestaurants,
  setSelectedResCoordinates,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;

export const selectAllNearbyRestaurantsState = createDraftSafeSelector(
  [state => state.restaurantSlice.allNearerRestaurants],
  restaurantsObject => restaurantsObject,
);

export const selectAllNearbyRestaurants = createDraftSafeSelector(
  [selectAllNearbyRestaurantsState],
  restaurantsObject => Object.values(restaurantsObject || {}),
);
