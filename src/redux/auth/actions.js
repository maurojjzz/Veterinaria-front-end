import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "./constants";

export const loginPenging = (pending) => {
  return {
    type: LOGIN_PENDING,
    payload: pending,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const signUpPending = (pending) => {
  return {
    type: SIGN_UP_PENDING,
    payload: pending,
  };
};

export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data,
  };
};

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error,
  };
};

export const logoutPenging = (pending) => {
  return {
    type: LOGOUT_PENDING,
    payload: pending,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};
