import index, {
  addTodo, completeAll, clearCompleted, updateTodo, deleteTodo
} from 'sagas/index';
import { select, take, call, put } from 'redux-saga/effects';
import actionTypes from 'constants/ActionTypes';
import todoActions from 'actions/todos';
import Immutable from 'immutable';

describe('sagas - index', () => {
  const rewireAddTodo = f => f;
  const rewireCompleteAll = f => f;
  const rewireClearCompleted = f => f;
  const rewireUpdateTodo = f => f;
  const rewireDeleteTodo = f => f;
  index.__Rewire__('todoStorage', {
    addTodo: rewireAddTodo,
    completeAll: rewireCompleteAll,
    clearCompleted: rewireClearCompleted,
    updateTodo: rewireUpdateTodo,
    deleteTodo: rewireDeleteTodo
  });

  after(() => {
    index.__ResetDependency__('todoStorage');
  });

  describe('addTodo', () => {
    it('should handle ADD_TODO', () => {
      const generator = addTodo();
      expect(generator.next().value).to.eql(select());
      expect(generator.next({ todos: [] }).value).to.eql(take(actionTypes.ADD_TODO));
      expect(generator.next({ id: '123', text: 'abc' }).value).to
      .eql(call(rewireAddTodo, '123', 'abc'));
      expect(generator.next({ data: 'dummy', response: 'dummy' }).value).to
      .eql(select());

      expect(generator.next({ todos: ['todoItem1'] }).value).to.eql(take(actionTypes.ADD_TODO));
      expect(generator.next({ id: '123', text: 'abc' }).value).to
      .eql(call(rewireAddTodo, '123', 'abc'));
      expect(generator.next({ error: 'dummy', response: 'dummy' }).value).to
      .eql(put(todoActions.replaceTodos(['todoItem1'])));
    });
  });

  describe('completeAll', () => {
    it('should handle COMPLETE_ALL', () => {
      const generator = completeAll();
      expect(generator.next().value).to.eql(select());
      expect(generator.next({ todos: ['todoItem34'] }).value).to
      .eql(take(actionTypes.COMPLETE_ALL));
      expect(generator.next({ allCompleted: false }).value).to
      .eql(call(rewireCompleteAll, true));
      expect(generator.next({}).value).to.eql(select());

      expect(generator.next({ todos: ['todoItem345'] }).value).to
      .eql(take(actionTypes.COMPLETE_ALL));
      expect(generator.next({ allCompleted: true }).value).to
      .eql(call(rewireCompleteAll, false));
      expect(generator.next({ error: 'dummy' }).value).to
      .eql(put(todoActions.replaceTodos(['todoItem345'])));
    });
  });

  describe('clearCompleted', () => {
    it('should handle CLEAR_COMPLETED', () => {
      const generator = clearCompleted();
      expect(generator.next().value).to.eql(select());
      expect(generator.next({ todos: ['todoItem2'] }).value).to
      .eql(take(actionTypes.CLEAR_COMPLETED));
      expect(generator.next().value).to.eql(call(rewireClearCompleted));
      expect(generator.next({}).value).to.eql(select());

      expect(generator.next({ todos: ['todoItem4'] }).value).to
      .eql(take(actionTypes.CLEAR_COMPLETED));
      expect(generator.next().value).to.eql(call(rewireClearCompleted));
      expect(generator.next({ error: 'dummy' }).value).to
      .eql(put(todoActions.replaceTodos(['todoItem4'])));
    });
  });

  describe('updateTodo', () => {
    it('should handle SET_EDITING_STATUS, EDIT_TODO and COMPLETE_TODO', () => {
      const generator = updateTodo();
      expect(generator.next().value).to.eql(select());
      expect(generator.next({ todos: ['todoItem248'] }).value).to
      .eql(take([actionTypes.SET_EDITING_STATUS, actionTypes.EDIT_TODO,
      actionTypes.COMPLETE_TODO]));
      expect(generator.next({ id: 432 }).value).to.eql(select());
      expect(generator.next({
        todos: Immutable.fromJS([
          {
            todoId: 234,
            todoText: 'first text',
            todoIsEditing: false,
            todoCompleted: false
          },
          {
            todoId: 432,
            todoText: 'second text',
            todoIsEditing: false,
            todoCompleted: true
          }
        ])
      }).value).to.eql(call(rewireUpdateTodo, 432, 'second text', false, true));
      expect(generator.next({}).value).to.eql(select());

      expect(generator.next({ todos: ['todoItem456'] }).value).to
      .eql(take([actionTypes.SET_EDITING_STATUS, actionTypes.EDIT_TODO,
      actionTypes.COMPLETE_TODO]));
      expect(generator.next({ id: 234 }).value).to.eql(select());
      expect(generator.next({
        todos: Immutable.fromJS([
          {
            todoId: 234,
            todoText: 'first text',
            todoIsEditing: false,
            todoCompleted: false
          },
          {
            todoId: 432,
            todoText: 'second text',
            todoIsEditing: false,
            todoCompleted: true
          }
        ])
      }).value).to.eql(call(rewireUpdateTodo, 234, 'first text', false, false));
      expect(generator.next({ error: 'dummy' }).value).to
      .eql(put(todoActions.replaceTodos(['todoItem456'])));
    });
  });

  describe('deleteTodo', () => {
    it('should handle DELETE_TODO', () => {
      const generator = deleteTodo();
      expect(generator.next().value).to.eql(select());
      expect(generator.next({ todos: ['todoItem8'] }).value).to
      .eql(take(actionTypes.DELETE_TODO));
      expect(generator.next({ id: 82 }).value).to.eql(call(rewireDeleteTodo, 82));
      expect(generator.next({}).value).to.eql(select());

      expect(generator.next({ todos: ['todoItem910'] }).value).to
      .eql(take(actionTypes.DELETE_TODO));
      expect(generator.next({ id: 1212 }).value).to.eql(call(rewireDeleteTodo, 1212));
      expect(generator.next({ error: 'dummy' }).value).to
      .eql(put(todoActions.replaceTodos(['todoItem910'])));
    });
  });
});
