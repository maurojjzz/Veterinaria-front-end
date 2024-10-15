import {
  GET_ESPECIE_PENDING,
  GET_ESPECIE_SUCCESS,
  GET_ESPECIE_ERROR,
  DELETE_ESPECIE_PENDING,
  DELETE_ESPECIE_SUCCESS,
  DELETE_ESPECIE_ERROR,
  ADD_ESPECIE_ERROR,
  ADD_ESPECIE_PENDING,
  ADD_ESPECIE_SUCCESS,
  UPDATE_ESPECIE_ERROR,
  UPDATE_ESPECIE_PENDING,
  UPDATE_ESPECIE_SUCCESS,
} from "./constants.js";

export const getEspeciePending = (pending) => {
  return {
    type: GET_ESPECIE_PENDING,
    payload: pending,
  };
};

export const getEspecieSuccess = (especie) => {
  return {
    type: GET_ESPECIE_SUCCESS,
    payload: especie,
  };
};

export const getEspecieError = (error) => {
  return {
    type: GET_ESPECIE_ERROR,
    payload: error,
  };
};

export const deleteEspeciePending = (pending) => {
  return {
    type: DELETE_ESPECIE_PENDING,
    payload: pending,
  };
};

export const deleteEspecieSuccess = (id) => {
  return {
    type: DELETE_ESPECIE_SUCCESS,
    payload: id,
  };
};

export const deleteEspecieError = (error) => {
  return {
    type: DELETE_ESPECIE_ERROR,
    payload: error,
  };
};

export const addEspeciePending = (pending) => {
  return {
    type: ADD_ESPECIE_PENDING,
    payload: pending,
  };
};

export const addEspecieSuccess = (especie) => {
  return {
    type: ADD_ESPECIE_SUCCESS,
    payload: especie,
  };
};

export const addEspecieError = (error) => {
  return {
    type: ADD_ESPECIE_ERROR,
    payload: error,
  };
};

export const updateEspeciePending = (pending) => {
  return {
    type: UPDATE_ESPECIE_PENDING,
    payload: pending,
  };
};

export const updateEspecieSuccess = (especie) => {
  return {
    type: UPDATE_ESPECIE_SUCCESS,
    payload: especie,
  };
};

export const updateEspecieError = (error) => {
  return {
    type: UPDATE_ESPECIE_ERROR,
    payload: error,
  };
};
