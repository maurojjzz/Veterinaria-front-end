import {
  GET_RAZA_PENDING,
  GET_RAZA_SUCCESS,
  GET_RAZA_ERROR,
  DELETE_RAZA_PENDING,
  DELETE_RAZA_SUCCESS,
  DELETE_RAZA_ERROR,
  ADD_RAZA_PENDING,
  ADD_RAZA_SUCCESS,
  ADD_RAZA_ERROR,
  UPDATE_RAZA_PENDING,
  UPDATE_RAZA_SUCCESS,
  UPDATE_RAZA_ERROR,
} from "./constants.js";

export const getRazaPending = (pending) => {
  return {
    type: GET_RAZA_PENDING,
    payload: pending,
  };
};

export const getRazaSuccess = (raza) => {
  return {
    type: GET_RAZA_SUCCESS,
    payload: raza,
  };
};

export const getRazaError = (error) => {
  return {
    type: GET_RAZA_ERROR,
    payload: error,
  };
};

export const deleteRazaPending = (pending) => {
  return {
    type: DELETE_RAZA_PENDING,
    payload: pending,
  };
};

export const deleteRazaSuccess = (id) => {
  return {
    type: DELETE_RAZA_SUCCESS,
    payload: id,
  };
};

export const deleteRazaError = (error) => {
  return {
    type: DELETE_RAZA_ERROR,
    payload: error,
  };
};

export const addRazaPending = (pending) => {
  return {
    type: ADD_RAZA_PENDING,
    payload: pending,
  };
};

export const addRazaSuccess = (raza) => {
  return {
    type: ADD_RAZA_SUCCESS,
    payload: raza,
  };
};

export const addRazaError = (error) => {
  return {
    type: ADD_RAZA_ERROR,
    payload: error,
  };
};

export const updateRazaPending = (pending) => {
  return {
    type: UPDATE_RAZA_PENDING,
    payload: pending,
  };
};

export const updateRazaSuccess = (raza) => {
  return {
    type: UPDATE_RAZA_SUCCESS,
    payload: raza,
  };
};

export const updateRazaError = (error) => {
  return {
    type: UPDATE_RAZA_ERROR,
    payload: error,
  };
};
