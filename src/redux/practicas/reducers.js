import {
  GET_PRACTICA_PENDING,
  GET_PRACTICA_SUCCESS,
  GET_PRACTICA_ERROR,
  DELETE_PRACTICA_PENDING,
  DELETE_PRACTICA_SUCCESS,
  DELETE_PRACTICA_ERROR,
  ADD_PRACTICA_PENDING,
  ADD_PRACTICA_SUCCESS,
  ADD_PRACTICA_ERROR,
  UPDATE_PRACTICA_PENDING,
  UPDATE_PRACTICA_SUCCESS,
  UPDATE_PRACTICA_ERROR,
} from "./constants.js";

const initialState = {
  practicas: [],
  pending: false,
  error: undefined,
};

const practicasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRACTICA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case GET_PRACTICA_SUCCESS: {
      return {
        ...state,
        practicas: action.payload,
      };
    }

    case GET_PRACTICA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_PRACTICA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_PRACTICA_SUCCESS: {
      const newList = state.practicas.filter((practica) => practica.id !== action.payload);
      return {
        ...state,
        practicas: newList,
      };
    }

    case DELETE_PRACTICA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_PRACTICA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_PRACTICA_SUCCESS: {
      return {
        ...state,
        practicas: [...state.practicas, action.payload],
      };
    }

    case ADD_PRACTICA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_PRACTICA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_PRACTICA_SUCCESS: {
      return {
        ...state,
        practicas: state.practicas.map((practica) => (practica.id === action.payload.id ? action.payload : practica)),
      };
    }

    case UPDATE_PRACTICA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default practicasReducer;
