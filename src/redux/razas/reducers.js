import {
  GET_RAZA_PENDING,
  GET_RAZA_SUCCESS,
  GET_RAZA_ERROR,
  DELETE_RAZA_PENDING,
  DELETE_RAZA_SUCCESS,
  DELETE_RAZA_ERROR,
  ADD_RAZA_PENDING,
  ADD_RAZA_SUCCESS,
  ADD_RAZA_ERROR,
  UPDATE_RAZA_PENDING,
  UPDATE_RAZA_SUCCESS,
  UPDATE_RAZA_ERROR,
} from "./constants.js";

const initialState = {
  razas: [],
  pending: false,
  error: undefined,
};

const razasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RAZA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_RAZA_SUCCESS: {
      return {
        ...state,
        razas: action.payload,
      };
    }
    case GET_RAZA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_RAZA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case DELETE_RAZA_SUCCESS: {
      return {
        ...state,
        razas: state.razas.filter((raza) => raza.id !== action.payload),
      };
    }
    case DELETE_RAZA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADD_RAZA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case ADD_RAZA_SUCCESS: {
      return {
        ...state,
        razas: [...state.razas, action.payload],
      };
    }
    case ADD_RAZA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case UPDATE_RAZA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case UPDATE_RAZA_SUCCESS: {
      return {
        ...state,
        razas: state.razas.map((raza) => (raza.id === action.payload.id ? action.payload : raza)),
      };
    }
    case UPDATE_RAZA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default razasReducer;
