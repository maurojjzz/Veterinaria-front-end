import axios from "../../axios-config";

import {
  addPracticaError,
  addPracticaPending,
  addPracticaSuccess,
  deletePracticaError,
  deletePracticaPending,
  deletePracticaSuccess,
  getPracticaError,
  getPracticaPending,
  getPracticaSuccess,
  updatePracticaError,
  updatePracticaPending,
  updatePracticaSuccess,
} from "./actions";

export const getPract = () => {
  return async (dispatch) => {
    dispatch(getPracticaPending(true));
    try {
      const { data } = await axios.get("/practicas");
      dispatch(getPracticaSuccess(data.data));
      dispatch(getPracticaError(undefined));
    } catch (error) {
      dispatch(getPracticaError(error.response?.data?.message || "Failed to fetch practicas"));
      throw error;
    } finally {
      dispatch(getPracticaPending(false));
    }
  };
};

export const addPract = (practica) => {
  return async (dispatch) => {
    dispatch(addPracticaPending(true));
    try {
      const { data } = await axios.post("/practicas", practica);
      dispatch(addPracticaSuccess(data.data));
      dispatch(addPracticaError(undefined));
      return data.data;
    } catch (error) {
      dispatch(addPracticaError(error.response?.data?.message || "Failed to add practica"));
      throw error;
    } finally {
      dispatch(addPracticaPending(false));
    }
  };
};

export const updatePract = (practica) => {
  return async (dispatch) => {
    dispatch(updatePracticaPending(true));
    try {
      const { data } = await axios.put(`/practicas/${practica.id}`, practica);
      dispatch(updatePracticaSuccess(data.data));
      dispatch(updatePracticaError(undefined));
    } catch (error) {
      dispatch(updatePracticaError(error.response?.data?.message || "Failed to update practica"));
      throw error;
    } finally {
      dispatch(updatePracticaPending(false));
    }
  };
};

export const deletePract = (id) => {
  return async (dispatch) => {
    dispatch(deletePracticaPending(true));
    try {
      await axios.delete(`/practicas/${id}`);
      dispatch(deletePracticaSuccess(id));
      dispatch(deletePracticaError(undefined));
    } catch (error) {
      dispatch(deletePracticaError(error.response?.data?.message || "Failed to delete practica"));
      throw error;
    } finally {
      dispatch(deletePracticaPending(false));
    }
  };
};
