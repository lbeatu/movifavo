import React, { useContext, useEffect } from "react";

import MovieContext from "../context/movie/movieContext";
import AlertContext from "../context/alert/alertContext";
import MovieItem from "./MovieItem";
import Spinner from "./Spinner";
const Moviefavorite = () => {
  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);

  const { favmovies, getFavorite, loading, deleteMovie } = movieContext;
  //console.log("TCL: Moviefavorite -> favmovies", favmovies);

  useEffect(() => {
    getFavorite();
    favCounts();
    //eslint-disable-next-line
  }, []);

  const favCounts = () => {
    alertContext.setAlert(
      "Favorite movie lenght:" + favmovies.length,
      "primary"
    );
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="card-fav">
        {favmovies !== null
          ? favmovies.map(movies => (
              <MovieItem key={movies.id} movies={movies} />
            ))
          : alertContext.setAlert("List is clear.Add moviee!!", "light")}
      </div>
    );
  }
};

export default Moviefavorite;
