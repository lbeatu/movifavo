import React, { useReducer } from "react";
import MovieContext from "./movieContext";
import MovieReducer from "./movieReducer";
import axios from "axios";
import {
  DETAILS_MOVIE,
  SET_MOVIES,
  GET_MOVIES,
  SET_LOADING,
  ERROR_MOVIE,
  GET_MOVIE,
  ADD_MOVIE,
  DELETE_MOVIE
} from "../types";

const movieState = props => {
  const initialState = {
    movies: [],
    movie: [],
    favmovies: [],
    loading: false,
    errormessage: null
  };
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  //Get favorite movies
  const getFavorite = async () => {
    setLoading();
    try {
      const res = await axios.get("/api/movies");
      // console.log("TCL: getFavorite -> res", res);

      dispatch({
        type: GET_MOVIE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_MOVIE,
        payload: err.response.msg
      });
    }
  };
  //Add favorite movie
  const addFavmovie = async movie => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/movies", movie, config);
      //console.log("TCL: res", res);

      dispatch({
        type: ADD_MOVIE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_MOVIE,
        payload: err.response.msg
      });
    }
  };
  // Delete movie
  const deleteMovie = async id => {
    try {
      //console.log(id);
      await axios.delete(`/api/movies/${id}`);

      dispatch({
        type: DELETE_MOVIE,
        payload: id
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_MOVIE,
        payload: err.response.msg
      });
    }
  };
  //get movie details
  const getMovieDetails = async id => {
    setLoading();
    //console.log(movieDetails);
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=24c4df7c`)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: DETAILS_MOVIE,
          payload: jsonResponse
        });
      });
  };
  const sendRequest = async title => {
    fetch(`http://www.omdbapi.com/?s=${title}\&plot=full\&apikey=24c4df7c`)
      .then(response => response.json())
      .then(jsonResponse => {
        //console.log(jsonResponse);
        if (jsonResponse.Response === "False") {
          //console.log(jsonResponse.Error);

          dispatch({
            type: ERROR_MOVIE,
            payload: jsonResponse.Error
          });
        } else {
          setLoading();
          dispatch({
            type: GET_MOVIES,
            payload: jsonResponse.Search
          });
        }
      });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        favmovies: state.favmovies,
        loading: state.loading,
        errormessage: state.errormessage,
        getFavorite,
        addFavmovie,
        deleteMovie,
        getMovieDetails,
        sendRequest
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
export default movieState;
