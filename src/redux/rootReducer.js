import {combineReducers} from 'redux';
import usersReducer from './users/reducers.js';

const rootReducer = combineReducers({
    users: usersReducer,
});


export default rootReducer