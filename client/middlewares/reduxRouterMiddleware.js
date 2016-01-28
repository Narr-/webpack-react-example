// for redux devtool
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);

export default reduxRouterMiddleware;
