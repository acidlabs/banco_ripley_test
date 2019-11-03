import { SET_TOKEN, DELETE_TOKEN } from "../actions";

const initialState = {
  token: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case DELETE_TOKEN:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
