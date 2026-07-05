import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  services: [],
  perks: [],
  actions: [],
};

const ServiceSlice = createSlice({
  initialState: initialState,
  name: sliceNames.serviceSlice,
  reducers: {
    setServices: (state, actions) => {
      state.services = actions?.payload;
    },
    setPerks: (state, actions) => {
      state.perks = actions?.payload;
    },
    setActions: (state, actions) => {
      state.actions = actions?.payload;
    },
    resetServiceSlice: (state, actions) => {
      state.services = [];
      state.perks = [];
      state.actions = [];
    },
  },
});

export const {setServices, setPerks, setActions, resetServiceSlice} =
  ServiceSlice.actions;

export default ServiceSlice.reducer;
