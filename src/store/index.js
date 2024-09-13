import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

import { ACTION_TYPE } from "src/store/action";

const initialState = {
  isError: false,
  isLoading: false,
  search: "",
  movies: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_ERROR:
      return { ...state, isError: action.payload };
    case ACTION_TYPE.CHANGE_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTION_TYPE.CHANGE_SEARCH:
      return { ...state, search: action.payload };
    case ACTION_TYPE.CHANGE_MOVIES:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
