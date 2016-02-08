import api from './api';
import localStorage from './localStorage';

export let todoStorage;

export const todoStoragePromise = api.checkApi().then(result => {
  if (result.error) {
    todoStorage = localStorage;
    return localStorage;
  } else if (result.data.userId) {
    localStorage.setItem('todoUserId', result.data.userId);
  }
  todoStorage = api;
  return api;
});
