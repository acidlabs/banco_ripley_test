import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import reducer from "./reducers";

const middlewares = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["product", "products"],
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middlewares)
);
export const persistor = persistStore(store);
