import { combineReducers } from '@reduxjs/toolkit'
import auth from '@redux/auth'

const rootReducer = combineReducers({
  auth: auth,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
