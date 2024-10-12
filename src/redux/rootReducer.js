import {combineReducers} from 'redux';
import usersReducer from './users/reducers.js';
import especiesReducer from './especies/reducers.js';
import veterinarioReducer from './veterinarios/reducers.js';

const rootReducer = combineReducers({
    users: usersReducer,
    especies: especiesReducer,
    veterinarios: veterinarioReducer
});


export default rootReducer