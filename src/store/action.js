export const ACTION_TYPE = {
  CHANGE_LOADING: "CHANGE_LOADING",
  CHANGE_MOVIES: "CHANGE_MOVIES",
  CHANGE_SEARCH: "CHANGE_SEARCH",
};

const changeLoading = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_LOADING,
    payload: payload,
  };
};

const changeSearch = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_SEARCH,
    payload: payload,
  };
};

const changeMovies = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_MOVIES,
    payload: payload,
  };
};

export const changeLoadingAsync = (payload) => {
  return async (dispatch) => {
    dispatch(changeLoading(payload));
  };
};

export const changeSearchAsync = (payload) => {
  return async (dispatch) => {
    dispatch(changeSearch(payload));
  };
};

export const changeMoviesAsync = (payload) => {
  return async (dispatch) => {
    dispatch(changeMovies(payload));
  };
};
