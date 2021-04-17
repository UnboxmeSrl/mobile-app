import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { AUTH_NAMESPACE } from '@redux/modules/auth'
import boxes from '@redux/modules/boxes'

import rootReducer from './rootReducer'

const persistConfig = {
  blacklist: [AUTH_NAMESPACE, 'boxes', 'products', 'orders'],
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

if (process.env.NODE_ENV === 'development') {
  module?.hot?.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}
