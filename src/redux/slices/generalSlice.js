import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  experienceLevels: [],
};

const GeneralSlice = createSlice({
  initialState: initialState,
  name: sliceNames.generalSlice,
  reducers: {
    setExperienceLevels: (state, actions) => {
      state.experienceLevels = actions?.payload;
    },
  },
});

export const {setExperienceLevels} = GeneralSlice.actions;

// Selectors
export const selectExperienceLevels = state =>
  state.generalSlice.experienceLevels;

export default GeneralSlice.reducer;
