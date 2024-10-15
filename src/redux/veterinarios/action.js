import {
  GET_VET_PENDING,
  GET_VET_SUCCESS,
  GET_VET_ERROR,
  DELETE_VET_PENDING,
  DELETE_VET_SUCCESS,
  DELETE_VET_ERROR,
  ADD_VET_ERROR,
  ADD_VET_PENDING,
  ADD_VET_SUCCESS,
  UPDATE_VET_ERROR,
  UPDATE_VET_PENDING,
  UPDATE_VET_SUCCESS,
} from "./constants.js";

export const getVetPending = (pending) => {
  return {
    type: GET_VET_PENDING,
    payload: pending,
  };
};

export const getVetError = (error) => {
  return {
    type: GET_VET_ERROR,
    payload: error,
  };
};

export const getVetSuccess = (veterinarios) => {
  return {
    type: GET_VET_SUCCESS,
    payload: veterinarios,
  };
};

export const deleteVetPending = (pending) => {
  return {
    type: DELETE_VET_PENDING,
    payload: pending,
  };
};

export const deleteVetError = (error) => {
  return {
    type: DELETE_VET_ERROR,
    payload: error,
  };
};

export const deleteVetSuccess = (id) => {
  return {
    type: DELETE_VET_SUCCESS,
    payload: id,
  };
};

export const addVetPending = (pending) => {
  return {
    type: ADD_VET_PENDING,
    payload: pending,
  };
};

export const addVetError = (error) => {
  return {
    type: ADD_VET_ERROR,
    payload: error,
  };
};

export const addVetSuccess = (veterinario) => {
  return {
    type: ADD_VET_SUCCESS,
    payload: veterinario,
  };
};

export const updateVetPending = (pending) => {
  return {
    type: UPDATE_VET_PENDING,
    payload: pending,
  };
};

export const updateVetError = (error) => {
  return {
    type: UPDATE_VET_ERROR,
    payload: error,
  };
};

export const updateVetSuccess = (veterinario) => {
  return {
    type: UPDATE_VET_SUCCESS,
    payload: veterinario,   
  };
};
