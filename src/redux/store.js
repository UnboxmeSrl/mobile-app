import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import rootReducer from './rootReducer'

const persistConfig = {
  key: 'claris-app',
  storage: AsyncStorage,
  whitelist: ['authSlice', 'locationSlice'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  middleware: getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    // serializableCheck: { warnAfter: 128 },
    // immutableCheck: false,
    // serializableCheck: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
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
