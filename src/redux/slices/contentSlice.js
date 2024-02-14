import { createSlice } from '@reduxjs/toolkit'

import { sliceNames } from '../../constants'

const initialState = {
  contentList: [],
}

const ContentSlice = createSlice({
  initialState: initialState,
  name: sliceNames.contentSlice,
  reducers: {
    setContentList: (state, actions) => {
      state.contentList = actions?.payload
    },
  },
})

export const { setContentList } = ContentSlice.actions

export default ContentSlice.reducer
