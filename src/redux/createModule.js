import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { prop } from 'ramda'

export const createReduxModule = ({ name, initialState = {} }) => {
  return {
    selectors: {
      selectState: prop(name),
    },
    slice: createSlice({
      initialState,
      name,
      reducers: {
        reset: (state, { payload }) => ({ ...initialState, ...payload }),
        setData: (state, { payload }) => ({ ...state, ...payload }),
      },
    }),
  }
}

export const createAsyncModule = ({ name, initialState = {} }) => {
  const fetch = createAsyncThunk(`${name}/fetch`, async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  })
  return {
    selectors: {
      selectState: prop(name),
    },
    slice: createSlice({
      initialState,
      name,
      reducers: {
        reset: () => initialState,
        setData: (state, { payload }) => payload,
      },
    }),
  }
}
