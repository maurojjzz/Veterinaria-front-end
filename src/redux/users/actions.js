import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  ADD_USER_ERROR,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
} from "./constants.js";

export const getUsersPending = (pending) => {
  return {
    type: GET_USER_PENDING,
    payload: pending,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USER_SUCCESS,
    payload: users,
  };
};

export const getUsersError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error,
  };
};

export const deleteUserPending = (pending) => {
  return {
    type: DELETE_USER_PENDING,
    payload: pending,
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id,
  };
};

export const deleteUserError = (error) => {
  return {
    type: DELETE_USER_ERROR,
    payload: error,
  };
};

export const addUserPending = (pending) => {
  return {
    type: ADD_USER_PENDING,
    payload: pending,
  };
};

export const addUserSuccess = (user) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: user,
  };
};

export const addUserError = (error) => {
  return {
    type: ADD_USER_ERROR,
    payload: error,
  };
};

export const updateUserPending = (pending) => {
  return {
    type: UPDATE_USER_PENDING,
    payload: pending,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserError = (error) => {
  return {
    type: UPDATE_USER_ERROR,
    payload: error,
  };
};
