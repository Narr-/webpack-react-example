/* eslint-disable no-console */

// `dispatch` gets returned result if logger is placed at first as arguments in applyMiddleware fn
export const logger = ({ getState, dispatch }) => // eslint-disable-line no-unused-vars
  next => action => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', getState());
    result.whoAmI = 'fromLogger1 Middleware';
    return result;
  };

export const logger2 = ({ getState }) => next => action => {
  console.log('dispatching2', action);
  const result = next(action);
  console.log('next state2', getState());
  result.whoAmI2 = 'fromLogger2 Middleware';
  return result;
};
