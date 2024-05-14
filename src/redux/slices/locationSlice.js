import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  city: {},
};

const LocationSlice = createSlice({
  initialState: initialState,
  name: sliceNames.locationSlice,
  reducers: {
    setCity: (state, actions) => {
      state.city = actions?.payload;
    },
    resetLocationSlice: (state, actions) => {
      state.city = {};
    },
  },
});

export const {setCity, resetLocationSlice} = LocationSlice.actions;

export default LocationSlice.reducer;
