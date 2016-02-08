import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import saga from 'redux-saga';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(saga(...rootSaga))
    )
  );

  return store;
}
