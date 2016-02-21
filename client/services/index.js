import api from './api';
import ls from './localStorage';
import socketInit from './socket';

export const socket = socketInit;
export let todoStorage;

export const todoStoragePromise = () => { // eslint-disable-line arrow-body-style
  return api.checkApi().then(result => {
    if (result.error) {
      todoStorage = ls;
      return { result, ls };
    } else if (result.data.userId) {
      if (typeof localStorage !== 'undefined') { // because it is also invoked from Server
        localStorage.setItem('todoUserId', result.data.userId);
      }
    }
    todoStorage = api;
    socketInit();
    return { result, api };
  });
};
