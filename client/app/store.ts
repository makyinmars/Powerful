import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "./sync-storage";

import { userApi } from "./services/userApi";
import authReducer from "./features/auth/authSlice";
import progressReducer from "./features/progress/progressSlice";
import { progressApi } from "./services/progressApi";
import { workoutApi } from "./services/workoutApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [progressApi.reducerPath]: progressApi.reducer,
  [workoutApi.reducerPath]: workoutApi.reducer,
  auth: authReducer,
  progress: progressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(progressApi.middleware)
      .concat(workoutApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
