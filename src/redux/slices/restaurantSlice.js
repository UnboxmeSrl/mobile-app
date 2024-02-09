import { createSlice } from '@reduxjs/toolkit'

import { sliceNames } from '../../constants'

const initialState = {
  bookings: [],
  restaurantDetails: {},
  serviceDetails: {},
  canceledBookings: [],
}

const RestaurantSlice = createSlice({
  initialState: initialState,
  name: sliceNames.restaurantSlice,
  reducers: {
    setBookings: (state, actions) => {
      state.bookings = actions?.payload
    },
    setRestaurantDetails: (state, actions) => {
      console.log('Restaurant Data set Action', actions?.payload)
      state.restaurantDetails = actions?.payload
    },
    setServiceDetails: (state, actions) => {
      state.serviceDetails = actions?.payload
    },
    setCanceledBookings: (state, actions) => {
      state.canceledBookings = actions?.payload
    },
  },
})

export const { setRestaurantDetails, setServiceDetails, setBookings, setCanceledBookings } = RestaurantSlice.actions

export default RestaurantSlice.reducer
