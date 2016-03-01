/* eslint-disable no-constant-condition */

import { take, put, call, fork, select } // eslint-disable-line no-unused-vars
from 'redux-saga/effects';
import actionTypes from '../constants/ActionTypes';
import todoActions from '../actions/todos';

// todoStorage is already chosen like api or localstroage
// when it is used in generator functions
import { todoStorage } from '../services';

export function* addTodo() {
  while (true) {
    const { todos: prevTodos } = yield select(); // To get the entire Store's state
    const action = yield take(actionTypes.ADD_TODO);
    /*
      ***THIS IS A BLOCKING CALL***
      It means that addTodo will ignore any ADD_TODO event until the current one completes
      i.e. concurrent ADD_TODO are not allowed(This needs to be
      enforced by the UI (e.g. disable button)
    */
    const { data, error, response } = yield call( // eslint-disable-line no-unused-vars
      todoStorage.addTodo, action.id, action.text);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

export function* completeAll() {
  while (true) {
    const { todos: prevTodos } = yield select();
    const action = yield take(actionTypes.COMPLETE_ALL);
    const { error } = yield call(todoStorage.completeAll, !action.allCompleted);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

export function* clearCompleted() {
  while (true) {
    const { todos: prevTodos } = yield select();
    yield take(actionTypes.CLEAR_COMPLETED);
    const { error } = yield call(todoStorage.clearCompleted);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

export function* updateTodo() {
  while (true) {
    const { todos: prevTodos } = yield select();
    const action = yield take([actionTypes.SET_EDITING_STATUS, actionTypes.EDIT_TODO,
     actionTypes.COMPLETE_TODO]);
    const { todos: changedTodos } = yield select();
    const targetTodo = changedTodos.find(todo => todo.get('todoId') === action.id);
    const { error } = yield call(todoStorage.updateTodo,
     action.id, targetTodo.get('todoText'),
     targetTodo.get('todoIsEditing'), targetTodo.get('todoCompleted'));
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

export function* deleteTodo() {
  while (true) {
    const { todos: prevTodos } = yield select();
    const action = yield take(actionTypes.DELETE_TODO);
    const { error } = yield call(todoStorage.deleteTodo, action.id);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

// export default function* root() {
//   yield fork(addTodo);
//   yield fork(nextRedditChange);
//   yield fork(invalidateReddit);
// }

export default [
  addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
];
