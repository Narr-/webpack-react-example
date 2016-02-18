import { combineReducers } from 'redux';
import todos from './todos';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  todos,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
