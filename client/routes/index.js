import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';

// polyfill webpack require.ensure for server rendering
if (typeof require.ensure !== 'function') {
  require.ensure = (dependencies, callback) => {
    callback(require);
  };
}

// pass props to App, and can get it by this.route.foo, this.route.foo2
// <Route path="\/" component={App} foo="bar" foo2 />
export const root = (
  <Route key="root" path="/(index.html)" component={App} />
); //

export const marvel = (
  <Route key="marvel" path="/marvel(/index.html)"
    getComponent={function getComponent(location, callback) {
      require.ensure([], require => { // can't use 'import' in require.ensure
        const Marvel = require('../containers/Marvel').default;
        callback(null, Marvel);
      }, 'marvel');
    }}
    isFromMarvel
  />
); //

export const status = (
  <Route key="status" path="/:status(/index.html)" component={App} />
); //

export default [root, marvel, status];
