export const ACTION_TYPE = {
  CHANGE_ERROR: "CHANGE_ERROR",
  CHANGE_LOADING: "CHANGE_LOADING",
  CHANGE_MOVIES: "CHANGE_MOVIES",
  CHANGE_SEARCH: "CHANGE_SEARCH",
};

const actionChangeError = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_ERROR,
    payload: payload,
  };
};

const actionChangeLoading = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_LOADING,
    payload: payload,
  };
};

const actionChangeSearch = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_SEARCH,
    payload: payload,
  };
};

const actionChangeMovies = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_MOVIES,
    payload: payload,
  };
};

export const changeError = (payload) => {
  return async (dispatch) => {
    dispatch(actionChangeError(payload));
  };
};

export const changeLoading = (payload) => {
  return async (dispatch) => {
    dispatch(actionChangeLoading(payload));
  };
};

export const changeSearch = (payload) => {
  return async (dispatch) => {
    dispatch(actionChangeSearch(payload));
  };
};

export const changeMovies = (payload) => {
  return async (dispatch) => {
    dispatch(actionChangeMovies(payload));
  };
};
