import axios from "../../axios-config";

import {
  addPrecioError,
  addPrecioPending,
  addPrecioSuccess,
  deletePrecioError,
  deletePrecioPending,
  deletePrecioSuccess,
  getPrecioError,
  getPrecioPending,
  getPrecioSuccess,
  updatePrecioError,
  updatePrecioPending,
  updatePrecioSuccess,
} from "./actions.js";

export const getPrecios = () => {
  return async (dispatch) => {
    dispatch(getPrecioPending(true));
    try {
      const { data } = await axios.get("/precios");
      dispatch(getPrecioSuccess(data.data));
      dispatch(getPrecioError(undefined));
    } catch (error) {
      dispatch(getPrecioError(error.response?.data?.message || "Failed to fetch precios"));
      throw error;
    } finally {
      dispatch(getPrecioPending(false));
    }
  };
};

export const addPrecio = (precio) => {
  return async (dispatch) => {
    dispatch(addPrecioPending(true));
    try {
      const { data } = await axios.post("/precios", precio);
      dispatch(addPrecioSuccess(data.data));
      dispatch(addPrecioError(undefined));
    } catch (error) {
      dispatch(addPrecioError(error.response?.data?.message || "Failed to add precio"));
      throw error;
    } finally {
      dispatch(addPrecioPending(false));
    }
  };
};

export const deletePrecio = (id) => {
  return async (dispatch) => {
    dispatch(deletePrecioPending(true));
    try {
      await axios.delete(`/precios/${id}`);
      dispatch(deletePrecioSuccess(id));
      dispatch(deletePrecioError(undefined));
    } catch (error) {
      dispatch(deletePrecioError(error.response?.data?.message || "Failed to delete precio"));
      throw error;
    } finally {
      dispatch(deletePrecioPending(false));
    }
  };
};

export const updatePrecio = (precio)=>{
  return async (dispatch) => {
    dispatch(updatePrecioPending(true));
    try {
      const { data } = await axios.put(`/precios/${precio.id}`, precio);
      dispatch(updatePrecioSuccess(data.data));
      dispatch(updatePrecioError(undefined));
    } catch (error) {
      dispatch(updatePrecioError(error.response?.data?.message || "Failed to update precio"));
      throw error;
    } finally {
      dispatch(updatePrecioPending(false));
    }
  }
}