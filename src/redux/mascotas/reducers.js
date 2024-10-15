import {
  GET_MASCOTA_PENDING,
  GET_MASCOTA_SUCCESS,
  GET_MASCOTA_ERROR,
  DELETE_MASCOTA_PENDING,
  DELETE_MASCOTA_SUCCESS,
  DELETE_MASCOTA_ERROR,
  ADD_MASCOTA_ERROR,
  ADD_MASCOTA_PENDING,
  ADD_MASCOTA_SUCCESS,
  UPDATE_MASCOTA_ERROR,
  UPDATE_MASCOTA_PENDING,
  UPDATE_MASCOTA_SUCCESS,
} from "./constants.js";

const initialState = {
  mascotas: [],
  pending: false,
  error: undefined,
};

const mascotasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASCOTA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case GET_MASCOTA_SUCCESS: {
      return {
        ...state,
        mascotas: action.payload,
      };
    }

    case GET_MASCOTA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_MASCOTA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_MASCOTA_SUCCESS: {
      return {
        ...state,
        mascotas: state.mascotas.filter((mascota) => mascota.id !== action.payload),
      };
    }

    case DELETE_MASCOTA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_MASCOTA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_MASCOTA_SUCCESS: {
      return {
        ...state,
        mascotas: [...state.mascotas, action.payload],
      };
    }

    case ADD_MASCOTA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_MASCOTA_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_MASCOTA_SUCCESS: {
      return {
        ...state,
        mascotas: state.mascotas.map((mascota) => (mascota.id === action.payload.id ? action.payload : mascota)),
      };
    }

    case UPDATE_MASCOTA_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};


export default mascotasReducer;