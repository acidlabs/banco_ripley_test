import { combineReducers } from "redux";

import fetchProductReducer from "./fetch-products";
import getProductReducer from "./get-product";
import authReducer from "./auth";

export default combineReducers({
  auth: authReducer,
  products: fetchProductReducer,
  product: getProductReducer
});
