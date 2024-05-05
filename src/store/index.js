import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import noteReducer from './features/noteSlice';
import logger from 'redux-logger'

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["payload", "user.value"],
    ignoredActions: ["user/setCurrentUser", "notesFetch"]
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(defaultMiddlewareConfig),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})