import fetch from 'isomorphic-fetch';

const API_ROOT_URI = '/api';
const TODOS_URI = 'api/todos';
const HEADERS_FOR_JSON = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then(data => ({
      data, response
    }));
  }
  const error = new Error(response.statusText);
  return { error, response };
}


function checkApi() {
  const promise = fetch(API_ROOT_URI, {
    credentials: 'same-origin', // to use session - https://github.com/github/fetch#caveats
    method: 'POST', // default GET
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      userId: localStorage.getItem('todoUserId')
    })
  })
  .then(handleResponse)
  .catch(error => ({ error })); // catch errors like the network error
  return promise;
}

function getTodos() {
  const promise = fetch(TODOS_URI, {
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
      todoId, todoText
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
      todoAllCompleted
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
  .then(handleResponse, error => ({ error }));
  return promise;
}

function updateTodo(id, todoText, todoIsEditing, todoCompleted) {
  const promise = fetch(`${TODOS_URI}/${id}`, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: HEADERS_FOR_JSON,
    body: JSON.stringify({
      todoText, todoIsEditing, todoCompleted
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
  .then(handleResponse, error => ({ error }));
  return promise;
}


export default {
  checkApi, getTodos, addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
};
