import {
  GET_VET_PENDING,
  GET_VET_SUCCESS,
  GET_VET_ERROR,
  DELETE_VET_PENDING,
  DELETE_VET_SUCCESS,
  DELETE_VET_ERROR,
  ADD_VET_ERROR,
  ADD_VET_PENDING,
  ADD_VET_SUCCESS,
  UPDATE_VET_ERROR,
  UPDATE_VET_PENDING,
  UPDATE_VET_SUCCESS,
} from "./constants.js";

const initialState = {
  veterinarios: [],
  pending: false,
  error: undefined,
};

const veterinarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VET_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_VET_SUCCESS: {
      return {
        ...state,
        veterinarios: action.payload,
      };
    }
    case GET_VET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_VET_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case DELETE_VET_SUCCESS: {
      const newList = state.veterinarios.filter((veterinario) => veterinario.id !== action.payload);
      return {
        ...state,
        veterinarios: newList,
      };
    }
    case DELETE_VET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADD_VET_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case ADD_VET_SUCCESS: {
      return {
        ...state,
        veterinarios: [...state.veterinarios, action.payload],
      };
    }
    case ADD_VET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_VET_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_VET_SUCCESS: {
      const newList = state.veterinarios.map((veterinario) => {
        return veterinario.id === action.payload.id ? action.payload : veterinario;
      });
      return {
        ...state,
        veterinarios: [...newList],
      };
    }

    case UPDATE_VET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default veterinarioReducer;
