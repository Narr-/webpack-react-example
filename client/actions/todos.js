import types from '../constants/ActionTypes';

export function addTodo(id, text) {
  return {
    type: types.ADD_TODO,
    id, text
  };
}

export function completeAll(allCompleted) {
  return {
    type: types.COMPLETE_ALL,
    allCompleted
  };
}

export function clearCompleted() {
  return {
    type: types.CLEAR_COMPLETED
  };
}

export function setEditStatus(id) {
  return {
    type: types.SET_EDITING_STATUS,
    id
  };
}

export function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id, text
  };
}

export function completeTodo(id) {
  return {
    type: types.COMPLETE_TODO,
    id
  };
}

export function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function replaceTodos(todos) {
  return {
    type: types.REPLACE_TODOS,
    todos
  };
}

export default {
  addTodo, completeAll, clearCompleted,
  setEditStatus, editTodo, completeTodo, deleteTodo,
  replaceTodos
};
