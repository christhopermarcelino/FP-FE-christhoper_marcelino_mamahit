import { createStore } from "redux";
import { ACTION_TYPE } from "./action";

const initialState = {
  isLoading: true,
  search: "",
  movies: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

const store = createStore(reducer);

export default store;
