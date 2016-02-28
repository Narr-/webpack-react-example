import { logger, logger2 } from 'middlewares/example';
import { addTodo, completeAll } from 'actions/todos';

// http://redux.js.org/docs/recipes/WritingTests.html
describe('middlewares - example', () => {
  describe('logger', () => {
    const dispatchWithStoreOf = (storeData, action) => {
      const dispatch = logger({
        getState: () => 'init state'
      })(actionAttempt => ({ actionAttempt }));
      return dispatch(action);
    };

    //
    it('dispatched result should be the same', () => {
      const action = addTodo();
      expect(dispatchWithStoreOf({}, action)).to.eql({
        actionAttempt: action,
        whoAmI: 'fromLogger1 Middleware'
      });
    });
  });

  //
  describe('logger2', () => {
    const dispatchWithStoreOf = (storeData, action) => {
      const dispatch = logger2({
        getState: () => 'init state'
      })(actionAttempt => ({ actionAttempt }));
      return dispatch(action);
    };

    //
    it('dispatched result should be the same', () => {
      const action = completeAll();
      expect(dispatchWithStoreOf({}, action)).to.eql({
        actionAttempt: action,
        whoAmI2: 'fromLogger2 Middleware'
      });
    });
  });
});
