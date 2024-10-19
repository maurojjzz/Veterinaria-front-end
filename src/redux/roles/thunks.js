import axios from "../../axios-config";

import {
  addRolError,
  addRolPending,
  addRolSuccess,
  deleteRolError,
  deleteRolPending,
  deleteRolSuccess,
  getRolError,
  getRolPending,
  getRolSuccess,
  updateRolError,
  updateRolPending,
  updateRolSuccess,
} from "./actions";

export const getRoles = () => {
  return async (dispatch) => {
    dispatch(getRolPending(true));
    try {
      const { data } = await axios.get("/roles");
      dispatch(getRolSuccess(data.data));
      dispatch(getRolError(undefined));
    } catch (error) {
      dispatch(getRolError(error.response?.data?.message || "Failed to fetch roles"));
      throw error;
    } finally {
      dispatch(getRolPending(false));
    }
  };
};

export const addRol = (rol) => {
  return async (dispatch) => {
    dispatch(addRolPending(true));
    try {
      const { data } = await axios.post("/roles", rol);
      dispatch(addRolSuccess(data.data));
      dispatch(addRolError(undefined));
    } catch (error) {
      dispatch(addRolError(error.response?.data?.message || "Failed to add rol"));
      throw error;
    } finally {
      dispatch(addRolPending(false));
    }
  };
};

export const updateRol = (rol) => {
  return async (dispatch) => {
    dispatch(updateRolPending(true));
    try {
      const { data } = await axios.put(`/roles/${rol.id}`, rol);
      dispatch(updateRolSuccess(data.data));
      dispatch(updateRolError(undefined));
    } catch (error) {
      dispatch(updateRolError(error.response?.data?.message || "Failed to update rol"));
      throw error;
    } finally {
      dispatch(updateRolPending(false));
    }
  };
};

export const deleteRol = (id) => {
  return async (dispatch) => {
    dispatch(deleteRolPending(true));
    try {
      await axios.delete(`/roles/${id}`);
      dispatch(deleteRolSuccess(id));
      dispatch(deleteRolError(undefined));
    } catch (error) {
      dispatch(deleteRolError(error.response?.data?.message || "Failed to delete rol"));
      throw error;
    } finally {
      dispatch(deleteRolPending(false));
    }
  };
};
