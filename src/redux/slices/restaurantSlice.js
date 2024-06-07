import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  bookings: [],
  restaurantDetails: {},
  serviceDetails: {},
  canceledBookings: [],
  timeFrameData: [],
  socialActions: [],
  allNearerRestaurants: {},
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
    setNearerRestaurants: (state, actions, {payload}) => {
      state.allNearerRestaurants = {
        ...payload.reduce((prev, curr) => ({...prev, [curr?.id]: curr}), {}),
      };
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
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
