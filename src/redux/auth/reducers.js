import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SESSION_EXPIRED,
} from "./constants";

const initialState = {
  token: undefined,
  role: undefined,
  authenticated: false,
  pending: false,
  error: undefined,
  sessionExpired: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case SIGN_UP_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        pending: action.payload,
        sessionExpired: false,
      };
    case LOGIN_ERROR:
    case SIGN_UP_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
        sessionExpired: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        authenticated: true,
        sessionExpired: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        token: undefined,
        role: undefined,
        authenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: undefined,
        role: undefined,
        authenticated: false,
        sessionExpired: false,
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        sessionExpired: true, 
        authenticated: false,
        token: undefined,
        role: undefined,
      };

    default:
      return state;
  }
};

export default authReducer;
