import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tempAuthSlice from './slices/tempAuth';
import restaurantSlice from './slices/restaurantSlice';
import contentSlice from './slices/contentSlice';
import serviceSlice from './slices/serviceSlice';
import locationSlice from './slices/locationSlice';
import generalSlice from './slices/generalSlice';

const rootReducer = combineReducers({
  authSlice: authSlice,
  tempAuth: tempAuthSlice,
  restaurantSlice: restaurantSlice,
  contentSlice: contentSlice,
  serviceSlice: serviceSlice,
  locationSlice: locationSlice,
  generalSlice: generalSlice,
});

export default rootReducer;
