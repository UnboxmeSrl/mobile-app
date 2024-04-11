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
    resetServiceSlice: (state, actions) => {
      state.services = []
    },
  },
})

export const { setServices, resetServiceSlice } = ServiceSlice.actions

export default ServiceSlice.reducer
