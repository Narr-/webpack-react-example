import { createStore, compose, applyMiddleware } from 'redux';
import reduxRouterMiddleware from '../middlewares/reduxRouterMiddleware';
import rootReducer from '../reducers';
import saga from 'redux-saga';
import rootSaga from '../sagas';
// import { logger as example, logger2 as example2 } from '../middlewares/example';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // example: dispatch first, return last
      // example2: dispacth last, return first
      // applyMiddleware(example, reduxRouterMiddleware, saga(rootSaga), example2),
      applyMiddleware(reduxRouterMiddleware, saga(...rootSaga)),
      // @ https://github.com/zalmoxisus/redux-devtools-extension
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f
      // https://github.com/zalmoxisus/redux-devtools-extension @
    )
  );

  // @ Enable Webpack hot module replacement for reducers
  // TODO: It doesn't work as of now, should check this later again
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  // Enable Webpack hot module replacement for reducers @

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
