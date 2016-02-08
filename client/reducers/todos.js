import {
  Map as iMap, List as iList
}
from 'immutable';

import {
  ADD_TODO, COMPLETE_ALL, CLEAR_COMPLETED,
  SET_EDITING_STATUS, EDIT_TODO, COMPLETE_TODO, DELETE_TODO,
  REPLACE_TODOS
}
from '../constants/ActionTypes';

const initialState = iList();

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.unshift(iMap({
        todoId: action.id,
        todoText: action.text,
        todoIsEditing: false,
        todoCompleted: false
      }));

    case COMPLETE_ALL: {
      return state.map(todo => todo.set('todoCompleted', !action.allCompleted));
    }

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.get('todoCompleted') === false);

    case SET_EDITING_STATUS:
      return state.map(todo =>
        todo.get('todoId') === action.id ?
          todo.set('todoIsEditing', !todo.get('todoIsEditing')) : todo
      );

    case EDIT_TODO:
      return state.map(todo => {
        if (todo.get('todoId') === action.id) {
          return todo.set('todoText', action.text).set('todoIsEditing', false);
        }
        return todo;
      });

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.get('todoId') === action.id ?
          todo.set('todoCompleted', !todo.get('todoCompleted')) : todo
      );

    case DELETE_TODO:
      return state.filter(todo =>
        todo.get('todoId') !== action.id
      );

    case REPLACE_TODOS:
      return action.todos;

    default:
      return state;
  }
}
