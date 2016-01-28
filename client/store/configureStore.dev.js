import { createStore, compose, applyMiddleware } from 'redux';
import reduxRouterMiddleware from '../middlewares/reduxRouterMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxRouterMiddleware),
      // @ https://github.com/zalmoxisus/redux-devtools-extension
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f
      // https://github.com/zalmoxisus/redux-devtools-extension @
    )
  );

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
