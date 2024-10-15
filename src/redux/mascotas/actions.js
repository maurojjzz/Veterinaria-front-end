import {
  GET_MASCOTA_PENDING,
  GET_MASCOTA_SUCCESS,
  GET_MASCOTA_ERROR,
  DELETE_MASCOTA_PENDING,
  DELETE_MASCOTA_SUCCESS,
  DELETE_MASCOTA_ERROR,
  ADD_MASCOTA_ERROR,
  ADD_MASCOTA_PENDING,
  ADD_MASCOTA_SUCCESS,
  UPDATE_MASCOTA_ERROR,
  UPDATE_MASCOTA_PENDING,
  UPDATE_MASCOTA_SUCCESS,
} from "./constants.js";

export const getMascotaPending = (pending) => {
  return {
    type: GET_MASCOTA_PENDING,
    payload: pending,
  };
};

export const getMascotaSuccess = (mascotas) => {
  return {
    type: GET_MASCOTA_SUCCESS,
    payload: mascotas,
  };
};

export const getMascotaError = (error) => {
  return {
    type: GET_MASCOTA_ERROR,
    payload: error,
  };
};

export const deleteMascotaPending = (pending) => {
  return {
    type: DELETE_MASCOTA_PENDING,
    payload: pending,
  };
};

export const deleteMascotaSuccess = (id) => {
  return {
    type: DELETE_MASCOTA_SUCCESS,
    payload: id,
  };
};

export const deleteMascotaError = (error) => {
  return {
    type: DELETE_MASCOTA_ERROR,
    payload: error,
  };
};

export const addMascotaPending = (pending) => {
  return {
    type: ADD_MASCOTA_PENDING,
    payload: pending,
  };
};

export const addMascotaSuccess = (mascota) => {
  return {
    type: ADD_MASCOTA_SUCCESS,
    payload: mascota,
  };
};

export const addMascotaError = (error) => {
  return {
    type: ADD_MASCOTA_ERROR,
    payload: error,
  };
};

export const updateMascotaPending = (pending) => {
  return {
    type: UPDATE_MASCOTA_PENDING,
    payload: pending,
  };
};

export const updateMascotaSuccess = (mascota) => {
  return {
    type: UPDATE_MASCOTA_SUCCESS,
    payload: mascota,
  };
};

export const updateMascotaError = (error) => {
  return {
    type: UPDATE_MASCOTA_ERROR,
    payload: error,
  };
};
