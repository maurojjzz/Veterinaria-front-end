import {
  GET_ATENCION_PENDING,
  GET_ATENCION_SUCCESS,
  GET_ATENCION_ERROR,
  DELETE_ATENCION_PENDING,
  DELETE_ATENCION_SUCCESS,
  DELETE_ATENCION_ERROR,
  ADD_ATENCION_ERROR,
  ADD_ATENCION_PENDING,
  ADD_ATENCION_SUCCESS,
  UPDATE_ATENCION_ERROR,
  UPDATE_ATENCION_PENDING,
  UPDATE_ATENCION_SUCCESS,
} from "./constants.js";

const initialState = {
  atenciones: [],
  pending: false,
  error: undefined,
};

const atencionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ATENCION_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_ATENCION_SUCCESS: {
      return {
        ...state,
        atenciones: action.payload,
      };
    }
    case GET_ATENCION_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case DELETE_ATENCION_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DELETE_ATENCION_SUCCESS: {
      return {
        ...state,
        atenciones: state.atenciones.filter((atencion) => atencion.id !== action.payload),
      };
    }

    case DELETE_ATENCION_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_ATENCION_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case ADD_ATENCION_SUCCESS: {
      return {
        ...state,
        atenciones: [...state.atenciones, action.payload],
      };
    }

    case ADD_ATENCION_ERROR: {
      return {
        ...state,
        error: action.payload,
      } 
    }

    case UPDATE_ATENCION_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_ATENCION_SUCCESS: {
      return {
        ...state,
        atenciones: state.atenciones.map((atencion) => atencion.id === action.payload.id ? action.payload : atencion),
      };
    }

    case UPDATE_ATENCION_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};


export default atencionReducer;