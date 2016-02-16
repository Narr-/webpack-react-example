/* eslint-disable no-constant-condition */

import { take, put, call, fork } from 'redux-saga/effects'; // eslint-disable-line no-unused-vars
import actionTypes from '../constants/ActionTypes';
import todoActions from '../actions/todos';

// todoStorage is already chosen like api or localstroage
// when it is used in generator functions
import { todoStorage } from '../services';

function* addTodo(getState) {
  while (true) {
    const prevTodos = getState().todos;
    const action = yield take(actionTypes.ADD_TODO);
    const { data, error, response } = yield call( // eslint-disable-line no-unused-vars
      todoStorage.addTodo, action.id, action.text);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

function* completeAll(getState) {
  while (true) {
    const prevTodos = getState().todos;
    const action = yield take(actionTypes.COMPLETE_ALL);
    const { error } = yield call(todoStorage.completeAll, !action.allCompleted);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

function* clearCompleted(getState) {
  while (true) {
    const prevTodos = getState().todos;
    yield take(actionTypes.CLEAR_COMPLETED);
    const { error } = yield call(todoStorage.clearCompleted);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

function* updateTodo(getState) {
  while (true) {
    const prevTodos = getState().todos;
    const action = yield take([actionTypes.SET_EDITING_STATUS, actionTypes.EDIT_TODO,
     actionTypes.COMPLETE_TODO]);
    const targetTodo = getState().todos.find(todo => todo.get('todoId') === action.id);
    const { error } = yield call(todoStorage.updateTodo,
     action.id, targetTodo.get('todoText'),
     targetTodo.get('todoIsEditing'), targetTodo.get('todoCompleted'));
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

function* deleteTodo(getState) {
  while (true) {
    const prevTodos = getState().todos;
    const action = yield take(actionTypes.DELETE_TODO);
    const { error } = yield call(todoStorage.deleteTodo, action.id);
    if (error) {
      yield put(todoActions.replaceTodos(prevTodos));
    }
  }
}

// export default function* root(getState) {
//   yield fork(addTodo, getState);
//   yield fork(nextRedditChange, getState);
//   yield fork(invalidateReddit, getState);
// }

export default [
  addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
];
