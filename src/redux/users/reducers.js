import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  ADD_USER_ERROR,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
} from "./constants.js";

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_USER_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case DELETE_USER_SUCCESS: {
      const newList = state.users.filter((user) => user.id !== action.payload);
      return {
        notes: [...newList],
      };
    }
    case DELETE_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADD_USER_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case ADD_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case UPDATE_USER_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const editUsers = state.users.map((user) => {
        return user.id === action.payload.id ? action.payload : user;
      });
      return {
        ...state,
        users: [...editUsers],
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
