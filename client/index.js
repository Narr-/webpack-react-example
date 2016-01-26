import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';

import {
  Map as iMap, List as iList
}
from 'immutable';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from './constants/TodoFilters'; // eslint-disable-line

const initialTodos = iList([
  iMap({
    text: 'Use Redux',
    completed: true,
    id: 0
  })
]);
const initialFilter = SHOW_COMPLETED;
const initialState = {
  todos: initialTodos,
  filter: initialFilter
};

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
