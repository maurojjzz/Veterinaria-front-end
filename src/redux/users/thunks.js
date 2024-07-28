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
} from "./actions.js";

export const initUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersPending(true));
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const usuarios = data.data.filter((u) => u.rol.descripcion === "Usuario");
        dispatch(getUsersSuccess(usuarios));
        dispatch(getUsersError(undefined));
      } else {
        dispatch(getUsersError(data.message || "Failed to fetch users"));
      }
    } catch (error) {
      dispatch(getUsersError(error.message || "Failed to fetch users"));
    } finally {
      dispatch(getUsersPending(false));
    }
  };
};

export const addNote = (note) => {
  return async (dispatch) => {
    dispatch(addUserPending(true));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(addUserSuccess(data.data));
        dispatch(addUserError(undefined));
      } else {
        dispatch(addUserError(data.message));
      }
    } catch (error) {
      dispatch(addUserError(error.message || "Failed to add note"));
    } finally {
      dispatch(addUserPending(false));
    }
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserPending(true));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/note/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(deleteUserSuccess(id));
      } else {
        dispatch(deleteUserError(data.message));
      }
    } catch (error) {
      dispatch(deleteUserError(error.message || "Failed to delete note"));
    } finally {
      dispatch(deleteUserPending(false));
    }
  };
};

export const updateNote = (note) => {
  return async (dispatch) => {
    dispatch(updateUserPending(true));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/note/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(updateUserSuccess(data.data));
        dispatch(updateUserError(undefined));
      } else {
        dispatch(updateUserError(data.message));
      }
    } catch (error) {
      dispatch(updateUserError(error.message || "Failed to update note"));
    } finally {
      dispatch(updateUserPending(false));
    }
  };
};
