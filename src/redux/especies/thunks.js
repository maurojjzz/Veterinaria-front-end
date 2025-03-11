import axios from "../../axios-config";

import {
  addEspecieError,
  addEspeciePending,
  addEspecieSuccess,
  deleteEspecieError,
  deleteEspeciePending,
  deleteEspecieSuccess,
  getEspecieError,
  getEspeciePending,
  getEspecieSuccess,
  updateEspecieError,
  updateEspeciePending,
  updateEspecieSuccess,
} from "./actions.js";

export const getEspecie = () => {
  return async (dispatch) => {
    dispatch(getEspeciePending(true));
    try {
      const { data } = await axios.get("/especies");
      dispatch(getEspecieSuccess(data.data));
      dispatch(getEspecieError(undefined));
    } catch (error) {
      dispatch(getEspecieError(error.response?.data?.message || "Failed to fetch species"));
      throw error;
    } finally {
      dispatch(getEspeciePending(false));
    }
  };
};

export const addEspecie = (especie) => {
  return async (dispatch) => {
    dispatch(addEspeciePending(true));
    try {
      const { data } = await axios.post("/especies", especie);
      dispatch(addEspecieSuccess(data.data));
      dispatch(addEspecieError(undefined));
      return data.data;
    } catch (error) {
      dispatch(addEspecieError(error.response?.data?.message || "Failed to add species"));
      throw error;
    } finally {
      dispatch(addEspeciePending(false));
    }
  };
};

export const updateEspecie = (especie) => {
  return async (dispatch) => {
    dispatch(updateEspeciePending(true));

    try {
      console.log("Especie a actualizar:", especie); 

      if (!especie.id) {
        throw new Error("El ID de la especie es undefined o null.");
      }

      const { data } = await axios.put(`/especies/${especie.id}`, especie);
      dispatch(updateEspecieSuccess(data.data));
      dispatch(updateEspecieError(undefined));
    } catch (error) {
      console.error("Error al actualizar especie:", error);
      dispatch(updateEspecieError(error.response?.data?.message || "Failed to update species"));
    } finally {
      dispatch(updateEspeciePending(false));
    }
  };
};


export const deleteEspecie = (id) => {
  return async (dispatch) => {
    dispatch(deleteEspeciePending(true));
    try {
      await axios.delete(`/especies/${id}`);
      dispatch(deleteEspecieSuccess(id));
      dispatch(deleteEspecieError(undefined));
    } catch (error) {
      dispatch(deleteEspecieError(error.response?.data?.message || "Failed to delete species"));
      throw error;
    } finally {
      dispatch(deleteEspeciePending(false));
    }
  };
};
