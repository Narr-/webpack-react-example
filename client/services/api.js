import fetch from 'isomorphic-fetch';
import { socket } from '../services';

let isUriSet = false;
let API_ROOT_URI = 'api';
let TODOS_URI = 'api/todos';
const HEADERS_FOR_JSON = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function setUris(uri) {
  if (!isUriSet) {
    // can't use "path.join" cos if uri is like "http://localhost:3000" and
    // the result will be http:/localhost:3000/api => bug?
    if (uri.slice(-1) === '/') { // http://localhost:3000/
      API_ROOT_URI = uri + API_ROOT_URI;
      TODOS_URI = uri + TODOS_URI;
    } else { // http://localhost:3000
      API_ROOT_URI = `${uri}/${API_ROOT_URI}`;
      TODOS_URI = `${uri}/${TODOS_URI}`;
    }
    isUriSet = true;
  }
}

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then(data => ({
      data, response
    }));
  }
  const error = new Error(response.statusText);
  return { error, response };
}


function checkApi(userIp) {
  const promise = fetch(API_ROOT_URI, {
    credentials: 'same-origin', // to use session - https://github.com/github/fetch#caveats
    method: 'POST', // default GET
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      userId: typeof localStorage === 'undefined' ? null : localStorage.getItem('todoUserId'),
      userIp
    })
  })
  .then(handleResponse)
  .catch(error => ({ error })); // catch errors like the network error
  return promise;
}

function getTodos(userId) {
  let id = null;
  if (userId) {
    id = userId;
  } else if (typeof localStorage !== 'undefined') {
    id = localStorage.getItem('todoUserId');
  }
  const promise = fetch(`${TODOS_URI}?userId=${id}`, {
    credentials: 'same-origin'
  })
  .then(handleResponse, error => ({ error })); // catch errors like the network error
  return promise;
}

function addTodo(todoId, todoText) {
  const promise = fetch(TODOS_URI, {
    credentials: 'same-origin',
    method: 'POST',
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      todoId, todoText,
      socketId: socket && socket().id
    })
  })
  .then(handleResponse, error => ({ error }));
  return promise;
}

function completeAll(todoAllCompleted) {
  const promise = fetch(TODOS_URI, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      todoAllCompleted,
      socketId: socket && socket().id
    })
  })
  .then(handleResponse, error => ({ error }));
  return promise;
}

function clearCompleted() {
  const promise = fetch(TODOS_URI, {
    credentials: 'same-origin',
    method: 'DELETE'
  })
  .then(handleResponse, error => ({ error }))
  .then(result => {
    const userId = localStorage.getItem('todoUserId');
    if (userId && socket) {
      socket().emit('dbChange', {
        message: 'Data deleted',
        dataObj: {
          userId
        }
      });
    }
    return result;
  });
  return promise;
}

function updateTodo(id, todoText, todoIsEditing, todoCompleted) {
  const promise = fetch(`${TODOS_URI}/${id}`, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      todoText, todoIsEditing, todoCompleted,
      socketId: socket && socket().id
    })
  })
  .then(handleResponse, error => ({ error }));
  return promise;
}

function deleteTodo(id) {
  const promise = fetch(`${TODOS_URI}/${id}`, {
    credentials: 'same-origin',
    method: 'DELETE'
  })
  .then(handleResponse, error => ({ error }))
  .then(result => {
    const userId = localStorage.getItem('todoUserId');
    if (userId && socket) {
      // socket emits here cos can't add postData(payload) to DELETE Method
      socket().emit('dbChange', {
        message: 'Data deleted',
        dataObj: {
          userId
        }
      });
    }
    return result;
  });
  return promise;
}


export default {
  setUris, checkApi, getTodos, addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
};
