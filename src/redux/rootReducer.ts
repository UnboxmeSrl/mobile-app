import { combineReducers } from '@reduxjs/toolkit'
import { reducer as network } from 'react-native-offline'

import auth from '@redux/modules/auth'

const rootReducer = combineReducers({
  auth: auth,
  network,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
