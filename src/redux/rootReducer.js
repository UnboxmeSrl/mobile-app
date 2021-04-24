import { reducer as network } from 'react-native-offline'
import { combineReducers } from '@reduxjs/toolkit'

import addresses from '@redux/modules/addresses'
import app from '@redux/modules/app'
import auth from '@redux/modules/auth'
import boxes from '@redux/modules/boxes'
import brands from '@redux/modules/brands'
import categories from '@redux/modules/categories'
import orders from '@redux/modules/orders'
import products from '@redux/modules/products'

const rootReducer = combineReducers({
  addresses: addresses.reducer,
  app: app.reducer,
  auth: auth.reducer,
  boxes: boxes.reducer,
  brands: brands.reducer,
  categories: categories.reducer,
  network,
  orders: orders.reducer,
  products: products.reducer,
})

export default rootReducer
