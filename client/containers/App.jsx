import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import todoActions from '../actions/todos';
import { createSelector } from 'reselect';

class App extends Component {
  render() {
    const { todos, appActions, params } = this.props;
    return (
      <div style={{ color: 'orange' }}>
        <Header addTodo={appActions.addTodo} />
        <MainSection todos={todos} actions={appActions}
          filter={typeof params.status === 'undefined' ? 'all' : params.status}
        />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  appActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const todosSelector = (state, props) =>
  ({
    todos: state.todos,
    status: props.params.status
  });

export const visibleTodosSelector = createSelector(
  todosSelector,
  todosSelectorRtnVal => ({
    todos: todosSelectorRtnVal.todos
  })
);

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(
  visibleTodosSelector,
  mapDispatchToProps
)(App);
