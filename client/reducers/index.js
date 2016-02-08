import { combineReducers } from 'redux';
import todos from './todos';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  todos,
  form: formReducer,
  routing: routeReducer
});

export default rootReducer;
