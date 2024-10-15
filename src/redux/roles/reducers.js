import {
  GET_ROL_PENDING,
  GET_ROL_SUCCESS,
  GET_ROL_ERROR,
  DELETE_ROL_PENDING,
  DELETE_ROL_SUCCESS,
  DELETE_ROL_ERROR,
  ADD_ROL_PENDING,
  ADD_ROL_SUCCESS,
  ADD_ROL_ERROR,
  UPDATE_ROL_PENDING,
  UPDATE_ROL_SUCCESS,
  UPDATE_ROL_ERROR,
} from "./constants.js";

const initialState = {
  roles: [],
  pending: false,
  error: undefined,
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROL_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case GET_ROL_SUCCESS: {
      return {
        ...state,
        roles: action.payload,
      };
    }

    case GET_ROL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_ROL_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_ROL_SUCCESS: {
      return {
        ...state,
        roles: state.roles.filter((rol) => rol.id !== action.payload),
      };
    }

    case DELETE_ROL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_ROL_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_ROL_SUCCESS: {
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    }

    case ADD_ROL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_ROL_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_ROL_SUCCESS: {
      return {
        ...state,
        roles: state.roles.map((rol) => (rol.id === action.payload.id ? action.payload : rol)),
      };
    }

    case UPDATE_ROL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rolesReducer;
