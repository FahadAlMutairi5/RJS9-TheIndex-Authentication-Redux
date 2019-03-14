import * as actionType from "./actionTypes";
import jwt_decode from "jwt-decode";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/"
});

const setLoading = () => ({
  type: actionType.SET_AUTHOR_LOADING
});

export const login = (userData, history) => {
	return dispatch => {
    console.log(history)
    dispatch(setLoading());
    instance
      .post("login/", userData)
      .then(res => res.data.token)
      .then(token =>
        dispatch(setAuthToken(token))
      )
      .then(()=>history.push("/authors"))
      .catch(err => console.error(err));
  };
};


export const signup = (userData, history) => {
	return dispatch => {
    dispatch(setLoading());
    instance
      .post("signup/", userData)
      .then(res => res.data.token)
      .then(token =>
        dispatch(setAuthToken(token))
      )
      .then(()=>history.push("/authors"))
      .catch(err => console.error(err));
  };
};

export const logout = () => {
	return setAuthToken()
};



const setAuthToken = token => {
  	let decodedUser;
  	if (token){
	return dispatch => {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    decodedUser = jwt_decode(token);
    dispatch({
      type: actionType.LOGIN,
      payload: decodedUser
    });
    localStorage.setItem("myToken", token);
    }
  	}else{
  	delete axios.defaults.headers.common.Authorization;
  	localStorage.removeItem("myToken");
  	return dispatch => {
  	dispatch({
      type: actionType.LOGIN,
      payload: decodedUser
    });
  	}
  }  	
};

export const checkForExpiredToken = () => {

  return dispatch => {
    // Get token
    const token = localStorage.getItem("myToken");

    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp > currentTime) {
        // Set auth token header
        dispatch(setAuthToken(token));
      } else {
        dispatch(logout());
      }
    }
  };
};
