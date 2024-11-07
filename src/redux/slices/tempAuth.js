import {createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  data: {
    isRejected: false,
    isApproved: false,
    isPending: false,
  },
};

const tempAuthSlice = createSlice({
  initialState: initialState,
  name: sliceNames.tempAuth,
  reducers: {
    setTempAuthData: (state, actions) => {
      state.data = {
        ...state.data,
        ...actions?.payload,
      };
    },
  },
});

export const {setTempAuthData} = tempAuthSlice.actions;

export default tempAuthSlice.reducer;

export const userRejected = state => state.tempAuth.data.isRejected;
export const isApproved = state => state.tempAuth.data.isApproved;
export const isPending = state => state.tempAuth.data.isPending;
