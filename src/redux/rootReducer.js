import {combineReducers} from 'redux';
import usersReducer from './users/reducers.js';
import especiesReducer from './especies/reducers.js';
import veterinarioReducer from './veterinarios/reducers.js';
import practicasReducer from './practicas/reducers.js';
import atencionesReducer from './atenciones/reducers.js';
import mascotasReducer from './mascotas/reducers.js';
import rolesReducer from './roles/reducers.js';
import pagosReducer from './pagos/reducers.js';
import razasReducer from './razas/reducers.js';
import preciosReducer from './precios/reducers.js';

const rootReducer = combineReducers({
    users: usersReducer,
    especies: especiesReducer,
    veterinarios: veterinarioReducer,
    practicas: practicasReducer,
    atenciones: atencionesReducer,
    mascotas: mascotasReducer,
    roles: rolesReducer,
    pagos: pagosReducer,
    razas: razasReducer,
    precios: preciosReducer
});


export default rootReducer