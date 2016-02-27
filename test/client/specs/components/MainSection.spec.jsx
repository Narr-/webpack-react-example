import React from 'react';
import { shallow } from 'enzyme';
import MainSection from 'components/MainSection';
import Immutable from 'immutable';

describe('<MainSection />', () => {
  describe('is the initial state', () => {
    const todos = Immutable.fromJS([]);
    const actions = {
      editTodo: f => f,
      deleteTodo: f => f,
      completeTodo: f => f,
      setEditStatus: f => f
    };
    const mainSection = (
      <MainSection
        todos={todos}
        actions={actions}
        filter=""
      />
    ); //
    const wrapper = shallow(mainSection);

    //
    it('section\'s className is main', () => {
      expect(wrapper.find('section').prop('className')).to.equal('main');
    });

    it('todo-list has no children', () => {
      expect(wrapper.find('.todo-list').children()).to.have.length(0);
    });
  });

  //
  describe('has one completed todo item and one not completed', () => {
    const todos = Immutable.fromJS([
      {
        todoId: 1,
        todoText: 'first text',
        todoIsEditing: false,
        todoCompleted: true
      },
      {
        todoId: 2,
        todoText: 'second text',
        todoIsEditing: true,
        todoCompleted: false
      }
    ]);
    const actions = {
      editTodo: f => f,
      deleteTodo: f => f,
      completeTodo: f => f,
      setEditStatus: f => f,
      clearCompleted: sinon.spy()
    };
    const mainSection = (
      <MainSection
        todos={todos}
        actions={actions}
        filter=""
      />
    ); //
    const wrapper = shallow(mainSection);

    //
    it('renders a .toggle-all input', () => {
      expect(wrapper.find('.toggle-all').type()).to.equal('input');
    });

    //
    it('todo-list has two children', () => {
      expect(wrapper.find('.todo-list').children()).to.have.length(2);
    });

    //
    it('<Footer />\'s prop, activeCount is 1', () => {
      expect(wrapper.find('Footer').props().activeCount).to.equal(1);
    });

    //
    it('executes onClearCompleted on Footer', () => {
      wrapper.find('Footer').prop('onClearCompleted')();
      expect(actions.clearCompleted.called).to.equal(true);
    });
  });

  //
  describe('has two todo items that are not completed', () => {
    const todos = Immutable.fromJS([
      {
        todoId: 1,
        todoText: 'first text',
        todoIsEditing: true,
        todoCompleted: false
      },
      {
        todoId: 2,
        todoText: 'second text',
        todoIsEditing: false,
        todoCompleted: false
      }
    ]);
    const actions = {
      editTodo: f => f,
      deleteTodo: f => f,
      completeTodo: f => f,
      setEditStatus: f => f,
      clearCompleted: sinon.spy()
    };
    const mainSection = (
      <MainSection
        todos={todos}
        actions={actions}
        filter="all"
      />
    ); //
    const wrapper = shallow(mainSection);

    //
    it('executes onClearCompleted on Footer', () => {
      wrapper.find('Footer').prop('onClearCompleted')();
      expect(actions.clearCompleted.called).to.equal(false);
    });

    //
    it('renders two TodoItem and they are completed', () => {
      expect(wrapper.find('TodoItem').at(0).prop('todo').get('todoCompleted')).to.equal(false);
      expect(wrapper.find('TodoItem').at(1).prop('todo').get('todoCompleted')).to.equal(false);
    });
  });

  //
  describe('has one completed todo item and two ones that are not completed', () => {
    const todos = Immutable.fromJS([
      {
        todoId: 1,
        todoText: 'first text',
        todoIsEditing: true,
        todoCompleted: true
      },
      {
        todoId: 2,
        todoText: 'second text',
        todoIsEditing: false,
        todoCompleted: false
      },
      {
        todoId: 3,
        todoText: 'third text',
        todoIsEditing: true,
        todoCompleted: false
      }
    ]);
    const actions = {
      editTodo: f => f,
      deleteTodo: f => f,
      completeTodo: f => f,
      setEditStatus: f => f,
      clearCompleted: sinon.spy()
    };
    const mainSection = (
      <MainSection
        todos={todos}
        actions={actions}
        filter="active"
      />
    ); //
    const wrapper = shallow(mainSection);

    //
    it('renders two TodoItem and they are completed', () => {
      expect(wrapper.find('TodoItem')).to.have.length(2);
      expect(wrapper.find('TodoItem').at(0).prop('todo').get('todoCompleted')).to.equal(false);
      expect(wrapper.find('TodoItem').at(1).prop('todo').get('todoCompleted')).to.equal(false);
    });
  });

  //
  describe('has two completed todo items and one that are not completed', () => {
    const todos = Immutable.fromJS([
      {
        todoId: 1,
        todoText: 'first text',
        todoIsEditing: true,
        todoCompleted: true
      },
      {
        todoId: 2,
        todoText: 'second text',
        todoIsEditing: false,
        todoCompleted: true
      },
      {
        todoId: 3,
        todoText: 'third text',
        todoIsEditing: true,
        todoCompleted: false
      }
    ]);
    const actions = {
      editTodo: f => f,
      deleteTodo: f => f,
      completeTodo: f => f,
      setEditStatus: f => f,
      clearCompleted: sinon.spy()
    };
    const mainSection = (
      <MainSection
        todos={todos}
        actions={actions}
        filter="completed"
      />
    ); //
    const wrapper = shallow(mainSection);

    //
    it('renders two TodoItem and they are completed', () => {
      expect(wrapper.find('TodoItem')).to.have.length(2);
      expect(wrapper.find('TodoItem').at(0).prop('todo').get('todoCompleted')).to.equal(true);
      expect(wrapper.find('TodoItem').at(1).prop('todo').get('todoCompleted')).to.equal(true);
    });
  });
});
