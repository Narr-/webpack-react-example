import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import App from '../containers/App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:status" component={App} />
  </Router>
);
