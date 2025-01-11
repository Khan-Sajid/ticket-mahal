import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { eventsApi } from "../features/home/api";
import { categoriesApi } from "../features/categories/api";
import { combineReducers } from "@reduxjs/toolkit";
import { categoriesApiPersistConfig } from "../features/categories/persistConfig";
import { eventsApiPersistConfig } from "../features/home/persistConfig";

const rootReducer = combineReducers({
  [categoriesApi.reducerPath]: persistReducer(
    categoriesApiPersistConfig,
    categoriesApi.reducer
  ),
  [eventsApi.reducerPath]: persistReducer(
    eventsApiPersistConfig,
    eventsApi.reducer
  ),
   //[eventsApi.reducerPath]: eventsApi.reducer
});

export const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: [] }, // eventsApi.reducerPath
  rootReducer
);
