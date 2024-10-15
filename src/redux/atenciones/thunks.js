import axios from "../../axios-config";

import {
  addAtencionError,
  addAtencionPending,
  addAtencionSuccess,
  deleteAtencionError,
  deleteAtencionPending,
  deleteAtencionSuccess,
  getAtencionError,
  getAtencionPending,
  getAtencionSuccess,
  updateAtencionError,
  updateAtencionPending,
  updateAtencionSuccess,
} from "./actions";

export const getAtenciones = () => {
  return async (dispatch) => {
    dispatch(getAtencionPending(true));
    try {
      const { data } = await axios.get("/atenciones");
      dispatch(getAtencionSuccess(data.data));
      dispatch(getAtencionError(undefined));
    } catch (error) {
      dispatch(getAtencionError(error.response?.data?.message || "Failed to fetch atenciones"));
      throw error;
    } finally {
      dispatch(getAtencionPending(false));
    }
  };
};

export const addAtencion = (atencion) => {
  return async (dispatch) => {
    dispatch(addAtencionPending(true));
    try {
      const { data } = await axios.post("/atenciones", atencion);
      dispatch(addAtencionSuccess(data.data));
      dispatch(addAtencionError(undefined));
    } catch (error) {
      dispatch(addAtencionError(error.response?.data?.message || "Failed to add atenciones"));
      throw error;
    } finally {
      dispatch(addAtencionPending(false));
    }
  };
};

export const updateAtencion = (atencion) => {
  return async (dispatch) => {
    dispatch(updateAtencionPending(true));
    try {
      const { data } = await axios.put(`/atenciones/${atencion.id}`, atencion);
      dispatch(updateAtencionSuccess(data.data));
      dispatch(updateAtencionError(undefined));
    } catch (error) {
      dispatch(updateAtencionError(error.response?.data?.message || "Failed to update atenciones"));
      throw error;
    } finally {
      dispatch(updateAtencionPending(false));
    }
  };
};

export const deleteAtencion = (id) => {
  return async (dispatch) => {
    dispatch(deleteAtencionPending(true));
    try {
      await axios.delete(`/atenciones/${id}`);
      dispatch(deleteAtencionSuccess(id));
      dispatch(deleteAtencionError(undefined));
    } catch (error) {
      dispatch(deleteAtencionError(error.response?.data?.message || "Failed to delete atenciones"));
      throw error;
    } finally {
      dispatch(deleteAtencionPending(false));
    }
  };
}
