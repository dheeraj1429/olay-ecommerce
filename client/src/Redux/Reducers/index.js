import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import indexReducer from './indexReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   admin: adminReducer,
   index: indexReducer,
});

export default rootReducer;
