import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import MovieContext from "../context/movie/movieContext";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/AuthContext";
import Spinner from "./Spinner";
//import Moviefavorite from "./Moviefavorite";

const Moviedetails = ({ match }) => {
  const [fav, setfav] = useState(0);

  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const {
    movie,
    loading,
    getMovieDetails,
    favmovies,
    getFavorite,
    addFavmovie,
    deleteMovie
  } = movieContext;
  useEffect(() => {
    getMovieDetails(match.params.imdbID);
    getFavorite();
    setfavorite();
    //eslint-disable-next-line
  }, [fav]);

  const {
    Actors,
    Awards,
    Country,
    DVD,
    Director,
    Genre,
    Language,
    Plot,
    Poster,
    Production,
    Title,
    Writer,
    Year,
    imdbRating,
    Runtime
  } = movie;

  const setfavorite = () => {
    if (isAuthenticated) {
      favmovies.map(movie => {
        if (movie.imdbID === match.params.imdbID) setfav(true);
      });
      console.log(
        "TCL: Moviedetails ->",
        favmovies.map(movie => movie.imdbID === match.params.imdbID)
      );
    }
  };

  const onClick = () => {
    if (isAuthenticated) {
      addFavmovie(movie);
      alertContext.setAlert("This movie added from favorite list", "dark");
    } else {
      alertContext.setAlert("Please sign in or sign up from Movifavo", "light");
    }
  };
  const onNotclick = () => {
    if (isAuthenticated) {
      favmovies.map(movie => {
        if (movie.imdbID === match.params.imdbID) {
          deleteMovie(movie._id);
          alertContext.setAlert(
            "This movie removed from favorite list",
            "light"
          );
        }
      });
    } else {
      alertContext.setAlert("Please sign in or sign up from Movifavo", "light");
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div class="card-container">
        <div class="card u-clearfix">
          <div class="card-body">
            <span class="card-number subtle">
              {Year} - {Genre}· {Runtime}
            </span>
            <span class="card-author subtle">Director:{Director}</span>
            <h2 class="card-title"> {Title}</h2>
            <span class="card-description subtle">{Plot}</span>
            <div class="card-read">{imdbRating}</div>
            <span class="card-author subtle">Country:{Country}</span>
            <span class="card-author subtle">Awards:{Awards}</span>
            <span class="card-author subtle">Language:{Language}</span>
            <span class="card-author subtle">DVD:{DVD}</span>
            <span class="card-author subtle">Production:{Production}</span>
            {!fav ? (
              <Link onClick={onClick} to={`/`} className="button-details">
                + ADD TO WATCHLIST
              </Link>
            ) : (
              <Link
                to={`/favorito`}
                onClick={onNotclick}
                className="button-details-remove"
              >
                - REMOVE FROM WATCHLIST
              </Link>
            )}
          </div>
          <div className=" card-body card-media">
            <img src={Poster} />
            <span class="card-author subtle">Writers:{Writer}</span>
            <span class="card-author subtle">Actors:{Actors}</span>
          </div>
        </div>
        <div class="card-shadow"></div>
      </div>
    );
  }
};

export default Moviedetails;
/*{favmovies.map(movies =>(
    <Moviefavorite key={movies.id} movies={favmovies}/>
    ))} */
