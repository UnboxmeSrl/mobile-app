import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  experienceLevels: [],
  selectedChannel: null,
};

const GeneralSlice = createSlice({
  initialState: initialState,
  name: sliceNames.generalSlice,
  reducers: {
    setExperienceLevels: (state, actions) => {
      state.experienceLevels = actions?.payload;
    },
    setSelectedChannel: (state, {payload}) => {
      state.selectedChannel = payload;
    },
  },
});

export const {setExperienceLevels, setSelectedChannel} = GeneralSlice.actions;

// Selectors
export const selectExperienceLevels = state =>
  state.generalSlice.experienceLevels;

export default GeneralSlice.reducer;
export const selecteSelectedChannel = state =>
  state.generalSlice.selectedChannel;
