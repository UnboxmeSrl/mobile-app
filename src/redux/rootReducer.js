import { reducer as network } from 'react-native-offline'
import { combineReducers } from '@reduxjs/toolkit'

import auth from '@redux/modules/auth'
import boxes from '@redux/modules/boxes'
import brands from '@redux/modules/brands'
import categories from '@redux/modules/categories'
import products from '@redux/modules/products'

const rootReducer = combineReducers({
  auth: auth.reducer,
  boxes: boxes.reducer,
  brands: brands.reducer,
  categories: categories.reducer,
  network,
  products: products.reducer,
})

export default rootReducer
