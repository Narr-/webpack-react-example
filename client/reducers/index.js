import { combineReducers } from 'redux';
import todos from './todos';
import { SHOW_ALL } from '../constants/TodoFilters';
import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';

const rootReducer = combineReducers({
  todos,
  filter: (state = SHOW_ALL, action) => {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter;
      default:
        return state;
    }
  }
});

export default rootReducer;
