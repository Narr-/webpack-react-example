import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import TodoItem from './TodoItem';
import Footer from './Footer';
import Immutable from 'immutable';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.get('completed'),
  [SHOW_COMPLETED]: todo => todo.get('completed')
};

class MainSection extends Component {
  constructor() { // constructor(props, context), super(props, context)
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleShow(filter) {
    this.props.actions.setVisibilityFilter(filter);
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.get('completed'));
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.size}
          onChange={actions.completeAll}
        /> //
      );
    }
  }

  renderFooter(completedCount) {
    const { todos, filter } = this.props;
    const activeCount = todos.size - completedCount;
    if (todos.size > 0) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onShow={this.handleShow}
          onClearCompleted={this.handleClearCompleted}
        /> //
      );
    }
  }

  render() {
    const { todos, actions, filter } = this.props;
    const completedCount = todos.reduce((count, todo) =>
      todo.get('completed') ? count + 1 : count, 0);
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.get('id')} todo={todo}
              editTodo={actions.editTodo}
              deleteTodo={actions.deleteTodo}
              completeTodo={actions.completeTodo}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  actions: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

export default MainSection;
