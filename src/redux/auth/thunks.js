import axios from "../../axios-config";

import {
  loginError,
  loginPenging,
  loginSuccess,
  logoutError,
  logoutPenging,
  logoutSuccess,
  //   signUpError,
  //   signUpPenging,
  //   signUpSuccess,
} from "./actions.js";

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginPenging(true));
    try {
      const res = await axios.post("/auth/login", data);
      const dataRes = res.data;

      localStorage.setItem("token", dataRes.token);
      localStorage.setItem("role", dataRes.role);

      dispatch(
        loginSuccess({
          token: dataRes.token,
          role: dataRes.role,
        })
      );
      dispatch(loginError(undefined));
    } catch (error) {
      dispatch(loginError(error.response.data.error));
      throw error;
    } finally {
      dispatch(loginPenging(false));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPenging(true));
    try {
      localStorage.clear();
      dispatch(logoutSuccess());
      dispatch(logoutError(undefined));
    } catch (error) {
      dispatch(logoutError(error.response.data.error));
      throw error;
    } finally {
      dispatch(logoutPenging(false));
    }
  };
};
