import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers
    //  console.log(localStorage);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);

      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
    loadUser();
  };
  // Login User
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      // console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // Logout User
  const logout = () => dispatch({ type: LOGOUT });

  // Clear User
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
