import {combineReducers} from 'redux';
import usersReducer from './users/reducers.js';
import especiesReducer from './especies/reducers.js';
import veterinarioReducer from './veterinarios/reducers.js';
import practicasReducer from './practicas/reducers.js';

const rootReducer = combineReducers({
    users: usersReducer,
    especies: especiesReducer,
    veterinarios: veterinarioReducer,
    practicas: practicasReducer
});


export default rootReducer