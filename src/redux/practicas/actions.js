import {
  GET_PRACTICA_PENDING,
  GET_PRACTICA_SUCCESS,
  GET_PRACTICA_ERROR,
  DELETE_PRACTICA_PENDING,
  DELETE_PRACTICA_SUCCESS,
  DELETE_PRACTICA_ERROR,
  ADD_PRACTICA_PENDING,
  ADD_PRACTICA_SUCCESS,
  ADD_PRACTICA_ERROR,
  UPDATE_PRACTICA_PENDING,
  UPDATE_PRACTICA_SUCCESS,
  UPDATE_PRACTICA_ERROR,
} from "./constants.js";

export const getPracticaPending = (pending) => {
  return {
    type: GET_PRACTICA_PENDING,
    payload: pending,
  };
};

export const getPracticaSuccess = (practica) => {
  return {
    type: GET_PRACTICA_SUCCESS,
    payload: practica,
  };
};

export const getPracticaError = (error) => {
  return {
    type: GET_PRACTICA_ERROR,
    payload: error,
  };
};

export const deletePracticaPending = (pending) => {
  return {
    type: DELETE_PRACTICA_PENDING,
    payload: pending,
  };
};

export const deletePracticaSuccess = (id) => {
  return {
    type: DELETE_PRACTICA_SUCCESS,
    payload: id,
  };
};

export const deletePracticaError = (error) => {
  return {
    type: DELETE_PRACTICA_ERROR,
    payload: error,
  };
};

export const addPracticaError = (error) => {
  return {
    type: ADD_PRACTICA_ERROR,
    payload: error,
  };
};

export const addPracticaPending = (pending) => {
  return {
    type: ADD_PRACTICA_PENDING,
    payload: pending,
  };
};

export const addPracticaSuccess = (practica) => {
  return {
    type: ADD_PRACTICA_SUCCESS,
    payload: practica,
  };
};

export const updatePracticaError = (error) => {
  return {
    type: UPDATE_PRACTICA_ERROR,
    payload: error,
  };
};

export const updatePracticaPending = (pending) => {
  return {
    type: UPDATE_PRACTICA_PENDING,
    payload: pending,
  };
};

export const updatePracticaSuccess = (practica) => {
  return {
    type: UPDATE_PRACTICA_SUCCESS,
    payload: practica,
  };
};
