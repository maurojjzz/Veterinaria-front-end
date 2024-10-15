import axios from "../../axios-config";

import {
  addRazaError,
  addRazaPending,
  addRazaSuccess,
  deleteRazaError,
  deleteRazaPending,
  deleteRazaSuccess,
  getRazaError,
  getRazaPending,
  getRazaSuccess,
  updateRazaError,
  updateRazaPending,
  updateRazaSuccess,
} from "./actions";

export const getRazas = () => {
  return async (dispatch) => {
    dispatch(getRazaPending(true));
    try {
      const { data } = await axios.get("/raza");
      dispatch(getRazaSuccess(data.data));
      dispatch(getRazaError(undefined));
    } catch (error) {
      dispatch(getRazaError(error.response?.data?.message || "Failed to fetch razas"));
      throw error;
    } finally {
      dispatch(getRazaPending(false));
    }
  };
};

export const addRaza = (raza) => {
  return async (dispatch) => {
    dispatch(addRazaPending(true));
    try {
      const { data } = await axios.post("/raza", raza);
      dispatch(addRazaSuccess(data.data));
      dispatch(addRazaError(undefined));
    } catch (error) {
      dispatch(addRazaError(error.response?.data?.message || "Failed to add raza"));
      throw error;
    } finally {
      dispatch(addRazaPending(false));
    }
  };
};

export const updateRaza = (raza) => {
  return async (dispatch) => {
    dispatch(updateRazaPending(true));
    try {
      const { data } = await axios.put(`/raza/${raza.id}`, raza);
      dispatch(updateRazaSuccess(data.data));
      dispatch(updateRazaError(undefined));
    } catch (error) {
      dispatch(updateRazaError(error.response?.data?.message || "Failed to update raza"));
      throw error;
    } finally {
      dispatch(updateRazaPending(false));
    }
  };
};

export const deleteRaza = (id) => {
  return async (dispatch) => {
    dispatch(deleteRazaPending(true));
    try {
      await axios.delete(`/raza/${id}`);
      dispatch(deleteRazaSuccess(id));
      dispatch(deleteRazaError(undefined));
    } catch (error) {
      dispatch(deleteRazaError(error.response?.data?.message || "Failed to delete raza"));
      throw error;
    } finally {
      dispatch(deleteRazaPending(false));
    }
  };
};
