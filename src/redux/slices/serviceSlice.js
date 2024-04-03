import { createSlice } from '@reduxjs/toolkit'
import { sliceNames } from '../../constants'

const initialState = {
  services: [],
}

const ServiceSlice = createSlice({
  initialState: initialState,
  name: sliceNames.serviceSlice,
  reducers: {
    setServices: (state, actions) => {
      state.services = actions?.payload
    },
  },
})

export const { setServices } = ServiceSlice.actions

export default ServiceSlice.reducer
