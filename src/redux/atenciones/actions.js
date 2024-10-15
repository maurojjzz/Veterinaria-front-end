import {
  GET_ATENCION_PENDING,
  GET_ATENCION_SUCCESS,
  GET_ATENCION_ERROR,
  DELETE_ATENCION_PENDING,
  DELETE_ATENCION_SUCCESS,
  DELETE_ATENCION_ERROR,
  ADD_ATENCION_ERROR,
  ADD_ATENCION_PENDING,
  ADD_ATENCION_SUCCESS,
  UPDATE_ATENCION_ERROR,
  UPDATE_ATENCION_PENDING,
  UPDATE_ATENCION_SUCCESS,
} from "./constants.js";

export const getAtencionPending = (pending) => {
  return {
    type: GET_ATENCION_PENDING,
    payload: pending,
  };
};

export const getAtencionSuccess = (atenciones) => {
  return {
    type: GET_ATENCION_SUCCESS,
    payload: atenciones,
  };
};

export const getAtencionError = (error) => {
  return {
    type: GET_ATENCION_ERROR,
    payload: error,
  };
};

export const deleteAtencionPending = (pending) => {
  return {
    type: DELETE_ATENCION_PENDING,
    payload: pending,
  };
};

export const deleteAtencionSuccess = (id) => {
  return {
    type: DELETE_ATENCION_SUCCESS,
    payload: id,
  };
};

export const deleteAtencionError = (error) => {
  return {
    type: DELETE_ATENCION_ERROR,
    payload: error,
  };
};

export const addAtencionPending = (pending) => {
  return {
    type: ADD_ATENCION_PENDING,
    payload: pending,
  };
};

export const addAtencionSuccess = (atenciones) => {
  return {
    type: ADD_ATENCION_SUCCESS,
    payload: atenciones,
  };
};

export const addAtencionError = (error) => {
  return {
    type: ADD_ATENCION_ERROR,
    payload: error,
  };
};

export const updateAtencionPending = (pending) => {
  return {
    type: UPDATE_ATENCION_PENDING,
    payload: pending,
  };
};

export const updateAtencionSuccess = (atenciones) => {
  return {
    type: UPDATE_ATENCION_SUCCESS,
    payload: atenciones,
  };
};

export const updateAtencionError = (error) => {
  return {
    type: UPDATE_ATENCION_ERROR,
    payload: error,
  };
};
