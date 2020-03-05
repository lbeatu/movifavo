import {
  DETAILS_MOVIE,
  GET_MOVIES,
  SET_LOADING,
  ERROR_MOVIE,
  ADD_MOVIE,
  GET_MOVIE,
  DELETE_MOVIE
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case DETAILS_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false
      };

    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        errormessage: null
      };
    case GET_MOVIE:
      return {
        ...state,
        favmovies: action.payload,
        loading: false
      };
    case ADD_MOVIE:
      return {
        ...state,
        favmovies: [action.payload, ...state.movies]
      };
    case DELETE_MOVIE:
      return {
        ...state,
        favmovies: state.favmovies.filter(
          movie => movie._id !== action.payload
        ),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ERROR_MOVIE:
      return {
        ...state,
        loading: false,
        errormessage: action.payload
      };
    default:
      return state;
  }
};
