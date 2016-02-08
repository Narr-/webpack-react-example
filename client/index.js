import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Router from './routes';
import {
  Map as iMap, List as iList,
}
from 'immutable';
import { todoStoragePromise } from './services';
import humps from 'humps';

todoStoragePromise.then((todoStorage) => {
  todoStorage.getTodos().then(result => {
    let initialState;
    if (!result.error) {
      const initVal = iList();
      const initialTodos = result.data.reduce( // or Immutable.fromJS(result.data).get(0));
      (pre, curr) => pre.push(iMap(humps.camelizeKeys(curr))), initVal);

      initialState = {
        todos: initialTodos
      };
    }

    const store = configureStore(initialState);

    render(
      <Provider store={store}>
        {Router}
      </Provider>,
      document.getElementById('root')
    );
  });
});
