// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { defaultReducer } from "./slice";
const createSagaMiddleware = require("redux-saga").default;
import rootSaga from "./saga";
import { api } from "./query";

const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
  default: defaultReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["default", api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(sagaMiddleWare)
      .concat(api.middleware),
});

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
