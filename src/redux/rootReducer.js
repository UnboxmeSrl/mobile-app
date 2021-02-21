import { reducer as network } from 'react-native-offline'
import { combineReducers } from '@reduxjs/toolkit'

import auth from '@redux/modules/auth'

const rootReducer = combineReducers({
  auth: auth,
  network,
})

export default rootReducer
