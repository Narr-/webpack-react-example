import React from 'react';
import { shallow } from 'enzyme';
import TodoItem from 'components/TodoItem';
import Immutable from 'immutable';

describe('<TodoItem />', () => {
  describe('is the initial state', () => {
    const todo = Immutable.fromJS({
      todoId: 248,
      todoText: 'first text',
      todoIsEditing: false,
      todoCompleted: false
    });
    const editTodo = sinon.spy();
    const deleteTodo = sinon.spy();
    const completeTodo = sinon.spy();
    const setEditStatus = sinon.spy();
    const todoItem = (
      <TodoItem todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        setEditStatus={setEditStatus}
      />
    ); //
    const wrapper = shallow(todoItem);

    //
    it('renders a .view and a label for todoText', () => {
      // console.log(wrapper.debug());
      expect(wrapper.find('.view').find('label.text').text()).to.equal('first text');
    });

    //
    it('simulates events on .view\'s children', () => {
      wrapper.find('input').simulate('change');
      expect(completeTodo.lastCall.args[0]).to.equal(todo.get('todoId'));

      wrapper.find('.view').children('label.text').simulate('doubleClick');
      expect(setEditStatus.lastCall.args[0]).to.equal(todo.get('todoId'));

      wrapper.find('.destroy').simulate('click');
      expect(deleteTodo.lastCall.args[0]).to.equal(todo.get('todoId'));
    });
  });

  describe('todo is editing', () => {
    const todo = Immutable.fromJS({
      todoId: 842,
      todoText: 'second text',
      todoIsEditing: true,
      todoCompleted: false
    });
    const editTodo = sinon.spy();
    const deleteTodo = sinon.spy();
    const completeTodo = sinon.spy();
    const setEditStatus = sinon.spy();
    const todoItem = (
      <TodoItem todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        setEditStatus={setEditStatus}
      />
    ); //
    const wrapper = shallow(todoItem);

    //
    it('renders a .editing and a .edit', () => {
      expect(wrapper.find('.editing').find('ConnectedForm')).to.have.length(1);
    });

    //
    it('simulates onSave on TodoEditInput', () => {
      wrapper.find('ConnectedForm').prop('onSave')('');
      expect(deleteTodo.lastCall.args[0]).to.equal(todo.get('todoId'));

      wrapper.find('ConnectedForm').prop('onSave')('save text');
      expect(editTodo.lastCall.args[0]).to.equal(todo.get('todoId'));
      expect(editTodo.lastCall.args[1]).to.equal('save text');
    });
  });
});
