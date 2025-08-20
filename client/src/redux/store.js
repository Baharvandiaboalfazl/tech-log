import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import postReducer from "./post/postSlice";
import commentReducer from "./comment/commentSlice";
import categoryReducer from "./category/categorySlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import settingsReducer from "./settings/settingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  category: categoryReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);
