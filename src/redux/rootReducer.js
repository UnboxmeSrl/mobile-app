import { reducer as network } from 'react-native-offline'
import { combineReducers } from '@reduxjs/toolkit'

import addresses from '@redux/modules/addresses'
import app from '@redux/modules/app'
import auth from '@redux/modules/auth'
import awardCategories from '@redux/modules/awardCategories'
import awards from '@redux/modules/awards'
import bookings from '@redux/modules/bookings'
import boxes from '@redux/modules/boxes'
import brands from '@redux/modules/brands'
import categories from '@redux/modules/categories'
import orders from '@redux/modules/orders'
import products from '@redux/modules/products'
import transactions from '@redux/modules/transactions'

import authSlice from './slices/authSlice'
import tempAuthSlice from './slices/tempAuth'
import restaurantSlice from './slices/restaurantSlice'
import contentSlice from './slices/contentSlice'
import serviceSlice from './slices/serviceSlice'
import locationSlice from './slices/locationSlice'

const rootReducer = combineReducers({
  addresses: addresses.reducer,
  app: app.reducer,
  auth: auth.reducer,
  authSlice: authSlice,
  tempAuth: tempAuthSlice,
  awardCategories: awardCategories.reducer,
  awards: awards.reducer,
  bookings: bookings.reducer,
  boxes: boxes.reducer,
  brands: brands.reducer,
  categories: categories.reducer,
  network,
  orders: orders.reducer,
  products: products.reducer,
  restaurantSlice: restaurantSlice,
  contentSlice: contentSlice,
  serviceSlice: serviceSlice,
  locationSlice: locationSlice,
  transactions: transactions.reducer,
})

export default rootReducer
