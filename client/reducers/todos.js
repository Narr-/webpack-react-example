import {
  Map as iMap, List as iList
}
from 'immutable';

import {
  ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED
}
from '../constants/ActionTypes';

const initialState = iList();

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.unshift(iMap({
        id: state.reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1) + 1,
        completed: false,
        text: action.text
      }));

    case DELETE_TODO:
      return state.filter(todo =>
        todo.get('id') !== action.id
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.get('id') === action.id ? todo.set('text', action.text) : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.get('id') === action.id ? todo.set('completed', !todo.get('completed')) : todo
      );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.get('completed'));
      return state.map(todo => todo.set('completed', !areAllMarked));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.get('completed') === false);

    default:
      return state;
  }
}
