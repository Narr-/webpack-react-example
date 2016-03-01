// no server rendering for this file, so we can use import(webpack) to import css
import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { setStore } from './store';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import { todoStoragePromise } from './services';
import Immutable from 'immutable';
import a11y from 'react-a11y'; // https://github.com/reactjs/react-a11y

if (process.env.NODE_ENV === 'development') {
  a11y(React);
}

const { pathname, search, hash } = window.location;
const entryUrl = `${pathname}${search}${hash}`;

console.log('Redux Initial State: %o', window.__INITIAL_STATE__); // eslint-disable-line no-console
console.log('Entry URL is: %s', entryUrl); // eslint-disable-line no-console

// https://github.com/rackt/example-react-router-server-rendering-lazy-routes/blob/master/modules/client.js
match({ routes, location: entryUrl }, () => {
  todoStoragePromise().then(() => {
    let initialState;
    if (window.__INITIAL_STATE__) {
      initialState = Object.assign({}, window.__INITIAL_STATE__);
      // console.log(initialState);
      initialState.todos = Immutable.fromJS(initialState.todos);
    }
    const store = configureStore(initialState);
    setStore(store);
    const history = syncHistoryWithStore(browserHistory, store);

    // routes is array whose chilren have each key id
    render(
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });
});
