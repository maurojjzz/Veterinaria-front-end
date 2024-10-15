import axios from "../../axios-config";

import {
  addMascotaError,
  addMascotaPending,
  addMascotaSuccess,
  deleteMascotaError,
  deleteMascotaPending,
  deleteMascotaSuccess,
  getMascotaError,
  getMascotaPending,
  getMascotaSuccess,
  updateMascotaError,
  updateMascotaPending,
  updateMascotaSuccess,
} from "./actions";

export const getMascotas = () => {
  return async (dispatch) => {
    dispatch(getMascotaPending(true));
    try {
      const { data } = await axios.get("/mascotas");
      dispatch(getMascotaSuccess(data.data));
      dispatch(getMascotaError(undefined));
    } catch (error) {
      dispatch(getMascotaError(error.response?.data?.message || "Failed to fetch mascotas"));
      throw error;
    } finally {
      dispatch(getMascotaPending(false));
    }
  };
};

export const addMascota = (mascota) => {
  return async (dispatch) => {
    dispatch(addMascotaPending(true));
    try {
      const { data } = await axios.post("/mascotas", mascota);
      dispatch(addMascotaSuccess(data.data));
      dispatch(addMascotaError(undefined));
    } catch (error) {
      dispatch(addMascotaError(error.response?.data?.message || "Failed to add mascota"));
      throw error;
    } finally {
      dispatch(addMascotaPending(false));
    }
  };
};

export const updateMascota = (mascota) => {
  return async (dispatch) => {
    dispatch(updateMascotaPending(true));
    try {
      const { data } = await axios.put(`/mascotas/${mascota.id}`, mascota);
      dispatch(updateMascotaSuccess(data.data));
      dispatch(updateMascotaError(undefined));
    } catch (error) {
      dispatch(updateMascotaError(error.response?.data?.message || "Failed to update mascota"));
      throw error;
    } finally {
      dispatch(updateMascotaPending(false));
    }
  };
};

export const deleteMascota = (id) => {
  return async (dispatch) => {
    dispatch(deleteMascotaPending(true));
    try {
      await axios.delete(`/mascotas/${id}`);
      dispatch(deleteMascotaSuccess(id));
      dispatch(deleteMascotaError(undefined));
    } catch (error) {
      dispatch(deleteMascotaError(error.response?.data?.message || "Failed to delete mascota"));
      throw error;
    } finally {
      dispatch(deleteMascotaPending(false));
    }
  };
};