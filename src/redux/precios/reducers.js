import {
  GET_PRECIO_PENDING,
  GET_PRECIO_SUCCESS,
  GET_PRECIO_ERROR,
  DELETE_PRECIO_PENDING,
  DELETE_PRECIO_SUCCESS,
  DELETE_PRECIO_ERROR,
  ADD_PRECIO_PENDING,
  ADD_PRECIO_SUCCESS,
  ADD_PRECIO_ERROR,
  UPDATE_PRECIO_PENDING,
  UPDATE_PRECIO_SUCCESS,
  UPDATE_PRECIO_ERROR,
} from "./constants.js";

const initialState = {
  precios: [],
  pending: false,
  error: undefined,
};

const preciosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRECIO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case GET_PRECIO_SUCCESS: {
      return {
        ...state,
        precios: action.payload,
      };
    }

    case GET_PRECIO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_PRECIO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_PRECIO_SUCCESS: {
      return {
        ...state,
        precios: state.precios.filter((precio) => precio.id !== action.payload),
      };
    }

    case DELETE_PRECIO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_PRECIO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_PRECIO_SUCCESS: {
      return {
        ...state,
        precios: [...state.precios, action.payload],
      };
    }

    case ADD_PRECIO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_PRECIO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_PRECIO_SUCCESS: {
      return {
        ...state,
        precios: state.precios.map((precio) => (precio.id === action.payload.id ? action.payload : precio)),
      };
    }

    case UPDATE_PRECIO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default preciosReducer;
