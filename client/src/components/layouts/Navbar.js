import React, { Fragment, useContext } from "react";
import MovieContext from "../../context/movie/movieContext";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
const Navbar = probs => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/favorito">
          <div className="fav-buttn">Favori List</div>
        </Link>
      </li>

      <li>
        Hello-<strong>{user && user.name}</strong>
      </li>
      <li>
        <a
          onClick={() => {
            logout();
          }}
          href="/"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" className="navbar-title">
          {" "}
          Sign in{" "}
        </Link>
      </li>
      <li>
        <Link to="/register" className="navbar-title">
          {" "}
          Sign Up
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <h1>
          <i className="fas fa-tape" /> Movifavo
        </h1>
      </Link>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
}; /*
Navbar.defaultProbs={
        title: 'Github Finder',
        icon: 'fab fa-github'
    };

Navbar.propTypes= {
        title:PropTypes.string.isRequired,
        icon:PropTypes.string.isRequired

    };*/
export default Navbar;
