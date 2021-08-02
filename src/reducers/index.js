import { combineReducers } from 'redux';
import productoReducer from './productosReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    productos: productoReducer,
    alerta: alertaReducer
});
