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

const rootReducer = combineReducers({
  addresses: addresses.reducer,
  app: app.reducer,
  auth: auth.reducer,
  awardCategories: awardCategories.reducer,
  awards: awards.reducer,
  bookings: bookings.reducer,
  boxes: boxes.reducer,
  brands: brands.reducer,
  categories: categories.reducer,
  network,
  orders: orders.reducer,
  products: products.reducer,
  transactions: transactions.reducer,
})

export default rootReducer
