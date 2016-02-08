const STORAGE_ID = 'todo_db';
let todos = [];

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
}

function getTodos() {
  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    const data = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    todos = data;
    // todos = [...data];
    // if (true) {
    //   reject(new Error('It broke'));
    // }
    resolve({ data });
  })
  .then(result => result, error => ({ error }));
}

function addTodo(todoId, todoText) {
  return new Promise((resolve) => {
    todos.unshift({
      todoId,
      todoText,
      todoIsEditing: false,
      todoCompleted: false
    });
    saveToLocalStorage();
    resolve({});
  })
  .then(result => result, error => ({ error }));
}

function completeAll(todoAllCompleted) {
  return new Promise((resolve) => {
    todos.forEach((todo, index) => { // eslint-disable-line no-unused-vars
      todo.todoCompleted = todoAllCompleted; // eslint-disable-line no-param-reassign
    });
    saveToLocalStorage();
    resolve({});
  })
  .then(result => result, error => ({ error }));
}

function clearCompleted() {
  return new Promise((resolve) => {
    for (let i = todos.length - 1; i > -1; i--) {
      if (todos[i].todoCompleted) {
        todos.splice(i, 1);
      }
    }
    saveToLocalStorage();
    resolve({});
  })
  .then(result => result, error => ({ error }));
}

function updateTodo(id, todoText, todoIsEditing, todoCompleted) {
  return new Promise((resolve) => {
    // can't use break in forEach so used for loop
    for (let i = 0, len = todos.length; i < len; i++) {
      const todo = todos[i];
      if (todo.todoId === id) {
        todo.todoText = todoText;
        todo.todoIsEditing = todoIsEditing;
        todo.todoCompleted = todoCompleted;
        break;
      }
    }
    saveToLocalStorage();
    resolve({});
  })
  .then(result => result, error => ({ error }));
}

function deleteTodo(id) {
  return new Promise((resolve) => {
    for (let i = todos.length - 1; i > -1; i--) {
      if (todos[i].todoId === id) {
        todos.splice(i, 1);
        break;
      }
    }
    saveToLocalStorage();
    resolve({});
  })
  .then(result => result, error => ({ error }));
}

export default {
  getTodos, addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
};
