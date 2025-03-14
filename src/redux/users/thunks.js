import axios from '../../axios-config'; 

import {
  addUserError,
  addUserPending,
  addUserSuccess,
  deleteUserError,
  deleteUserPending,
  deleteUserSuccess,
  getUsersError,
  getUsersPending,
  getUsersSuccess,
  updateUserError,
  updateUserPending,
  updateUserSuccess,
} from './actions.js';

export const initUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersPending(true));
    try {
      const { data } = await axios.get('/usuarios');

      const usuarios = data.data.filter((u) => u.rol.descripcion === 'Usuario');
      dispatch(getUsersSuccess(usuarios));
      dispatch(getUsersError(undefined));
    } catch (error) {
      dispatch(getUsersError(error.response?.data?.message || 'Failed to fetch users'));
    } finally {
      dispatch(getUsersPending(false));
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch(getUsersPending(true));
    try {
      const { data } = await axios.get(`/usuarios/${id}`);
      dispatch(getUsersError(undefined));
      return data.data;
    } catch (error) {
      
    } finally {
      dispatch(getUsersPending(false));
    }
  };
}

export const initAdmins = () => {
  return async (dispatch) => {
    dispatch(getUsersPending(true));
    try {
      const { data } = await axios.get('/usuarios');

      const usuarios = data.data.filter((u) => u.rol.descripcion === 'Admin');
      dispatch(getUsersSuccess(usuarios));
      dispatch(getUsersError(undefined));
    } catch (error) {
      dispatch(getUsersError(error.response?.data?.message || 'Failed to fetch users'));
    } finally {
      dispatch(getUsersPending(false));
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(addUserPending(true));
    try {
      const { data } = await axios.post('/usuarios', user); 

      dispatch(addUserSuccess(data.data));
      dispatch(addUserError(undefined));
    } catch (error) {
      dispatch(addUserError(error.response?.data?.message || 'Failed to add user'));
      throw error;
    } finally {
      dispatch(addUserPending(false));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserPending(true));
    try {
      await axios.delete(`/usuarios/${id}`); 

      dispatch(deleteUserSuccess(id));
    } catch (error) {
      dispatch(deleteUserError(error.response?.data?.message || 'Failed to delete user'));
      throw error;
    } finally {
      dispatch(deleteUserPending(false));
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch(updateUserPending(true));
    try {
      const { data } = await axios.put(`/usuarios/${user.id}`, user); 

      dispatch(updateUserSuccess(data.data));
      dispatch(updateUserError(undefined));
    } catch (error) {
      dispatch(updateUserError(error.response?.data?.message || 'Failed to update user'));
      throw error;
    } finally {
      dispatch(updateUserPending(false));
    }
  };
};
