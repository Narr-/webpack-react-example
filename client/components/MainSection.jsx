import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import TodoItem from './TodoItem';
import Footer from './Footer';
import Immutable from 'immutable';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.get('todoCompleted'),
  [SHOW_COMPLETED]: todo => todo.get('todoCompleted')
};

class MainSection extends Component {
  constructor() { // constructor(props, context), super(props, context)
    super();
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.get('todoCompleted'));
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    const inputId = 'toggle-all';
    if (todos.size > 0) {
      return (
        <div>
          <label
            className="toggle-all"
            htmlFor={inputId}
          />
          <input
            id={inputId}
            type="checkbox"
            checked={completedCount === todos.size}
            onChange={actions.completeAll}
          />
        </div>
      );
    }
  } //

  renderFooter(completedCount) {
    const { todos, filter } = this.props;
    const activeCount = todos.size - completedCount;
    if (todos.size > 0) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
        />
      );
    }
  } //

  render() {
    const { todos, actions, filter } = this.props;
    const completedCount = todos.reduce((count, todo) =>
      todo.get('todoCompleted') ? count + 1 : count, 0);
    const filterFn = TODO_FILTERS[`SHOW_${filter.toUpperCase()}`] || (() => true);
    const filteredTodos = todos.filter(filterFn);
    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.get('todoId')} todo={todo}
              editTodo={actions.editTodo}
              deleteTodo={actions.deleteTodo}
              completeTodo={actions.completeTodo}
              setEditStatus={actions.setEditStatus}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  } //
}

MainSection.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  actions: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

export default MainSection;
