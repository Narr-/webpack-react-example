import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Router from './routes';

import {
  Map as iMap, List as iList
}
from 'immutable';

const initialTodos = iList([
  iMap({
    text: 'Use Redux',
    completed: true,
    id: 0,
    isEditing: false
  })
]);
const initialState = {
  todos: initialTodos
};

const store = configureStore(initialState);

render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
);
