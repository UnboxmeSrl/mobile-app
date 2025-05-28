import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {sliceNames} from '../../constants';

const initialState = {
  contentList: {},
};

const ContentSlice = createSlice({
  initialState: initialState,
  name: sliceNames.contentSlice,
  reducers: {
    setContentList: (state, actions) => {
      state.contentList = {
        ...actions.payload?.reduce(
          (prev, next) => ({...prev, [next?.id]: next}),
          {},
        ),
      };
    },
    // setContentList: (state, actions) => {
    //   state.contentList = actions?.payload;
    // },
    resetContentSlice: (state, actions) => {
      state.contentList = [];
    },
  },
});

export const {setContentList, resetContentSlice} = ContentSlice.actions;

export default ContentSlice.reducer;

export const selectContentList = createDraftSafeSelector(
  [state => state.contentSlice.contentList],
  contentList => Object.values(contentList || {}),
);
