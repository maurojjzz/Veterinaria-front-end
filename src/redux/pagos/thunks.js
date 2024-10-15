import axios from "../../axios-config";

import {
  addPagoError,
  addPagoPending,
  addPagoSuccess,
  deletePagoError,
  deletePagoPending,
  deletePagoSuccess,
  getPagoError,
  getPagoPending,
  getPagoSuccess,
  updatePagoError,
  updatePagoPending,
  updatePagoSuccess,
} from "./actions";

export const getPagos = () => {
  return async (dispatch) => {
    dispatch(getPagoPending());
    try {
      const { data } = await axios.get("/pagos");
      dispatch(getPagoSuccess(data.data));
      dispatch(getPagoError(undefined));
    } catch (error) {
      dispatch(getPagoError(error.response?.data?.message || "Failed to fetch pagos"));
      throw error;
    } finally {
      dispatch(getPagoPending(false));
    }
  };
};

export const addPago = (pago) => {
  return async (dispatch) => {
    dispatch(addPagoPending(true));
    try {
      const { data } = await axios.post("/pagos", pago);
      dispatch(addPagoSuccess(data.data));
      dispatch(addPagoError(undefined));
    } catch (error) {
      dispatch(addPagoError(error.response?.data?.message || "Failed to add pago"));
      throw error;
    } finally {
      dispatch(addPagoPending(false));
    }
  };
};

export const updatePago = (pago) => {
  return async (dispatch) => {
    dispatch(updatePagoPending(true));
    try {
      const { data } = await axios.put(`/pagos/${pago.id}`, pago);
      dispatch(updatePagoSuccess(data.data));
      dispatch(updatePagoError(undefined));
    } catch (error) {
      dispatch(updatePagoError(error.response?.data?.message || "Failed to update pago"));
      throw error;
    } finally {
      dispatch(updatePagoPending(false));
    }
  };
};

export const deletePago = (id) => {
  return async (dispatch) => {
    dispatch(deletePagoPending(true));
    try {
      await axios.delete(`/pagos/${id}`);
      dispatch(deletePagoSuccess(id));
      dispatch(deletePagoError(undefined));
    } catch (error) {
      dispatch(deletePagoError(error.response?.data?.message || "Failed to delete pago"));
      throw error;
    } finally {
      dispatch(deletePagoPending(false));
    }
  };
};

