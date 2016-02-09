import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import App from '../containers/App';

export default (
  <Router history={browserHistory}>
    {
      /* pass props to App, and can get it by this.route.foo, this.route.foo2 */
      /* <Route path="/" component={App} foo="bar" foo2 /> */
    }
    <Route path="/" component={App} />
    {
      /* // for highlighting problem in Sublime Text */
    }
    <Route path="/marvel" getComponent={function getComponent(location, callback) {
      require.ensure([], require => { // can't use 'import' in require.ensure
        const Marvel = require('../containers/Marvel').default;
        callback(null, Marvel);
      }, 'marvel');
    }}
      isFromMarvel
    />
    {
      /* // for highlighting problem in Sublime Text */
    }
    <Route path="/:status" component={App} />
  </Router>
);
