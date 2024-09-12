export const ACTION_TYPE = {
  CHANGE_LOADING: "CHANGE_LOADING",
  CHANGE_MOVIES: "CHANGE_MOVIES",
  CHANGE_SEARCH: "CHANGE_SEARCH",
};

export const changeLoading = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_LOADING,
    payload: payload,
  };
};

export const changeSearch = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_SEARCH,
    payload: payload,
  };
};

export const changeMovies = (payload) => {
  return {
    type: ACTION_TYPE.CHANGE_MOVIES,
    payload: payload,
  };
};
