import axios from "../../axios-config";

import {
  addVetError,
  addVetPending,
  addVetSuccess,
  deleteVetError,
  deleteVetPending,
  deleteVetSuccess,
  getVetError,
  getVetPending,
  getVetSuccess,
  updateVetError,
  updateVetPending,
  updateVetSuccess,
} from "./action.js";

export const getVet = () => {
  return async (dispatch) => {
    dispatch(getVetPending(true));
    try {
      const { data } = await axios.get("/veterinarios");
      dispatch(getVetSuccess(data.data));
      dispatch(getVetError(undefined));
    } catch (error) {
      dispatch(getVetError(error.response?.data?.message || "Failed to fetch veterinarians"));
      throw error;
    } finally {
      dispatch(getVetPending(false));
    }
  };
};

export const addVet = (veterinario) => {
  return async (dispatch) => {
    dispatch(addVetPending(true));
    try {
      const { data } = await axios.post("/veterinarios", veterinario);
      dispatch(addVetSuccess(data.data));
      dispatch(addVetError(undefined));
    } catch (error) {
      dispatch(addVetError(error.response?.data?.message || "Failed to add vet"));
      throw error;
    } finally {
      dispatch(addVetPending(false));
    }
  };
};

export const updateVet = (veterinario) => {
  return async (dispatch) => {
    dispatch(updateVetPending(true));
    try {
      const { data } = await axios.put(`/veterinarios/${veterinario.id}`, veterinario);
      dispatch(updateVetSuccess(data.data));
      dispatch(updateVetError(undefined));
    } catch (error) {
      dispatch(updateVetError(error.response?.data?.message || "Failed to update vet"));
      throw error;
    } finally {
      dispatch(updateVetPending(false));
    }
  };
};

export const deleteVet = (id) => {
  return async (dispatch) => {
    dispatch(deleteVetPending(true));
    try {
      await axios.delete(`/veterinarios/${id}`);
      dispatch(deleteVetSuccess(id));
      dispatch(deleteVetError(undefined));
    } catch (error) {
      dispatch(deleteVetError(error.response?.data?.message || "Failed to delete vet"));
      throw error;
    } finally {
      dispatch(deleteVetPending(false));
    }
  };
};
