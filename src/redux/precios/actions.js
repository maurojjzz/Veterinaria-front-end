import {
  GET_PRECIO_PENDING,
  GET_PRECIO_SUCCESS,
  GET_PRECIO_ERROR,
  DELETE_PRECIO_PENDING,
  DELETE_PRECIO_SUCCESS,
  DELETE_PRECIO_ERROR,
  ADD_PRECIO_PENDING,
  ADD_PRECIO_SUCCESS,
  ADD_PRECIO_ERROR,
  UPDATE_PRECIO_PENDING,
  UPDATE_PRECIO_SUCCESS,
  UPDATE_PRECIO_ERROR,
} from "./constants.js";

export const getPrecioPending = (pending) => {
  return {
    type: GET_PRECIO_PENDING,
    payload: pending,
  };
};

export const getPrecioSuccess = (precios) => {
  return {
    type: GET_PRECIO_SUCCESS,
    payload: precios,
  };
};

export const getPrecioError = (error) => {
  return {
    type: GET_PRECIO_ERROR,
    payload: error,
  };
};

export const deletePrecioPending = (pending) => {
  return {
    type: DELETE_PRECIO_PENDING,
    payload: pending,
  };
};

export const deletePrecioSuccess = (id) => {
  return {
    type: DELETE_PRECIO_SUCCESS,
    payload: id,
  };
};

export const deletePrecioError = (error) => {
  return {
    type: DELETE_PRECIO_ERROR,
    payload: error,
  };
};

export const addPrecioPending = (pending) => {
  return {
    type: ADD_PRECIO_PENDING,
    payload: pending,
  };
};

export const addPrecioSuccess = (precios) => {
  return {
    type: ADD_PRECIO_SUCCESS,
    payload: precios,
  };
};

export const addPrecioError = (error) => {
  return {
    type: ADD_PRECIO_ERROR,
    payload: error,
  };
};

export const updatePrecioPending = (pending) => {
  return {
    type: UPDATE_PRECIO_PENDING,
    payload: pending,
  };
};

export const updatePrecioSuccess = (precios) => {
  return {
    type: UPDATE_PRECIO_SUCCESS,
    payload: precios,
  };
};

export const updatePrecioError = (error) => {
  return {
    type: UPDATE_PRECIO_ERROR,
    payload: error,
  };
};
