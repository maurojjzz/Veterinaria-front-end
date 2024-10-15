import {
  GET_PAGO_PENDING,
  GET_PAGO_SUCCESS,
  GET_PAGO_ERROR,
  DELETE_PAGO_PENDING,
  DELETE_PAGO_SUCCESS,
  DELETE_PAGO_ERROR,
  ADD_PAGO_PENDING,
  ADD_PAGO_SUCCESS,
  ADD_PAGO_ERROR,
  UPDATE_PAGO_PENDING,
  UPDATE_PAGO_SUCCESS,
  UPDATE_PAGO_ERROR,
} from "./constants.js";

const initialState = {
  pagos: [],
  pending: false,
  error: undefined,
};

const pagosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_PAGO_SUCCESS: {
      return {
        ...state,
        pagos: action.payload,
      };
    }
    case GET_PAGO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_PAGO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case DELETE_PAGO_SUCCESS: {
      return {
        ...state,
        pagos: state.pagos.filter((pago) => pago.id !== action.payload),
      };
    }
    case DELETE_PAGO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADD_PAGO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case ADD_PAGO_SUCCESS: {
      return {
        ...state,
        pagos: [...state.pagos, action.payload],
      };
    }

    case ADD_PAGO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case UPDATE_PAGO_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case UPDATE_PAGO_SUCCESS: {
      return {
        ...state,
        pagos: state.pagos.map((pago) => (pago.id === action.payload.id ? action.payload : pago)),
      };
    }

    case UPDATE_PAGO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default pagosReducer;
