import {
  GET_PAGO_PENDING,
  GET_PAGO_SUCCESS,
  GET_PAGO_ERROR,
  DELETE_PAGO_PENDING,
  DELETE_PAGO_SUCCESS,
  DELETE_PAGO_ERROR,
  ADD_PAGO_PENDING,
  ADD_PAGO_SUCCESS,
  ADD_PAGO_ERROR,
  UPDATE_PAGO_PENDING,
  UPDATE_PAGO_SUCCESS,
  UPDATE_PAGO_ERROR,
} from "./constants.js";

export const getPagoPending = (pending) => {
  return {
    type: GET_PAGO_PENDING,
    payload: pending,
  };
};

export const getPagoSuccess = (pago) => {
  return {
    type: GET_PAGO_SUCCESS,
    payload: pago,
  };
};

export const getPagoError = (error) => {
  return {
    type: GET_PAGO_ERROR,
    payload: error,
  };
};

export const deletePagoPending = (pending) => {
  return {
    type: DELETE_PAGO_PENDING,
    payload: pending,
  };
};

export const deletePagoSuccess = (id) => {
  return {
    type: DELETE_PAGO_SUCCESS,
    payload: id,
  };
};

export const deletePagoError = (error) => {
  return {
    type: DELETE_PAGO_ERROR,
    payload: error,
  };
};

export const addPagoPending = (pending) => {
  return {
    type: ADD_PAGO_PENDING,
    payload: pending,
  };
};

export const addPagoSuccess = (pago) => {
  return {
    type: ADD_PAGO_SUCCESS,
    payload: pago,
  };
};

export const addPagoError = (error) => {
  return {
    type: ADD_PAGO_ERROR,
    payload: error,
  };
};

export const updatePagoPending = (pending) => {
  return {
    type: UPDATE_PAGO_PENDING,
    payload: pending,
  };
};

export const updatePagoSuccess = (pago) => {
  return {
    type: UPDATE_PAGO_SUCCESS,
    payload: pago,
  };
};

export const updatePagoError = (error) => {
  return {
    type: UPDATE_PAGO_ERROR,
    payload: error,
  };
};
