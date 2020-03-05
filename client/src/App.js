import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Movielist from "./movies/Movielist";
import Moviefavorite from "./movies/Moviefavorite";
import moviedetails from "./movies/Moviedetails";
import NotFound from "./movies/NotFound";
import MovieState from "./context/movie/movieState";
import AlertState from "./context/alert/alertState";
import AuthState from "./context/auth/AuthState";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <MovieState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div>
                <Alert alert={alert} />
                <Switch>
                  <Route exact path="/" component={Movielist} />
                  <Route path="/movie/:imdbID" component={moviedetails} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/favorito" component={Moviefavorite} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </MovieState>
    </AuthState>
  );
};

export default App;
