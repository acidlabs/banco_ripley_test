export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export const GET_PRODUCT_PENDING = "GET_PRODUCT_PENDING";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";

export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error: error
  };
}

export function getProductPending() {
  return {
    type: GET_PRODUCT_PENDING
  };
}

export function getProductSuccess(product) {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: product
  };
}

export function getProductError(error) {
  return {
    type: GET_PRODUCT_ERROR,
    error: error
  };
}
