import {
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR
} from "../actions";

const initialState = {
  pending: false,
  product: {},
  error: null
};

export default function getProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
        product: action.payload
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getProduct = state => state.products;
export const getProductPending = state => state.pending;
export const getProductError = state => state.error;
