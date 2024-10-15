import {
  GET_ESPECIE_PENDING,
  GET_ESPECIE_SUCCESS,
  GET_ESPECIE_ERROR,
  DELETE_ESPECIE_PENDING,
  DELETE_ESPECIE_SUCCESS,
  DELETE_ESPECIE_ERROR,
  ADD_ESPECIE_ERROR,
  ADD_ESPECIE_PENDING,
  ADD_ESPECIE_SUCCESS,
  UPDATE_ESPECIE_ERROR,
  UPDATE_ESPECIE_PENDING,
  UPDATE_ESPECIE_SUCCESS,
} from "./constants.js";

const initialState = {
  especies: [],
  pending: false,
  error: undefined,
};

const especieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ESPECIE_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_ESPECIE_SUCCESS: {
      return {
        ...state,
        especies: action.payload,
      };
    }
    case GET_ESPECIE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_ESPECIE_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_ESPECIE_SUCCESS: {
      const newList = state.especies.filter((especie) => especie.id !== action.payload);
      return {
        ...state,
        especies: newList,
      };
    }

    case DELETE_ESPECIE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_ESPECIE_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_ESPECIE_SUCCESS: {
      return {
        ...state,
        especies: [...state.especies, action.payload],
      };
    }

    case ADD_ESPECIE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_ESPECIE_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_ESPECIE_SUCCESS: {
      const newList = state.especies.map((especie) => {
        return especie.id === action.payload.id ? action.payload : especie;
      });
      return {
        ...state,
        especies: [...newList],
      };
    }

    case UPDATE_ESPECIE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default especieReducer;
