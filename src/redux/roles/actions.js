import {
  GET_ROL_PENDING,
  GET_ROL_SUCCESS,
  GET_ROL_ERROR,
  DELETE_ROL_PENDING,
  DELETE_ROL_SUCCESS,
  DELETE_ROL_ERROR,
  ADD_ROL_PENDING,
  ADD_ROL_SUCCESS,
  ADD_ROL_ERROR,
  UPDATE_ROL_PENDING,
  UPDATE_ROL_SUCCESS,
  UPDATE_ROL_ERROR,
} from "./constants.js";

export const getRolPending = (pending) => {
  return {
    type: GET_ROL_PENDING,
    payload: pending,
  };
};

export const getRolSuccess = (rol) => {
  return {
    type: GET_ROL_SUCCESS,
    payload: rol,
  };
};

export const getRolError = (error) => {
  return {
    type: GET_ROL_ERROR,
    payload: error,
  };
};

export const deleteRolPending = (pending) => {
  return {
    type: DELETE_ROL_PENDING,
    payload: pending,
  };
};

export const deleteRolSuccess = (id) => {
  return {
    type: DELETE_ROL_SUCCESS,
    payload: id,
  };
};

export const deleteRolError = (error) => {
  return {
    type: DELETE_ROL_ERROR,
    payload: error,
  };
};

export const addRolPending = (pending) => {
  return {
    type: ADD_ROL_PENDING,
    payload: pending,
  };
};

export const addRolSuccess = (rol) => {
  return {
    type: ADD_ROL_SUCCESS,
    payload: rol,
  };
};

export const addRolError = (error) => {
  return {
    type: ADD_ROL_ERROR,
    payload: error,
  };
};

export const updateRolPending = (pending) => {
  return {
    type: UPDATE_ROL_PENDING,
    payload: pending,
  };
};

export const updateRolSuccess = (rol) => {
  return {
    type: UPDATE_ROL_SUCCESS,
    payload: rol,
  };
};

export const updateRolError = (error) => {
  return {
    type: UPDATE_ROL_ERROR,
    payload: error,
  };
};
