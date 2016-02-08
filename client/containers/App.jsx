import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import todoActions from '../actions/todos';
import uuid from 'node-uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    const completeAll = this.props.appActions.completeAll;
    this.props.appActions.completeAll = () => completeAll(this.areAllMarked());
  }

  addTodo(text) {
    this.props.appActions.addTodo(uuid.v1(), text);
  }

  areAllMarked() {
    return this.props.todos.every(todo => todo.get('todoCompleted'));
  }

  render() {
    const { todos, appActions, params } = this.props;
    return (
      <div style={{ color: 'orange' }}>
        <Header addTodo={this.addTodo} />
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

function mapStateToProps(state) { // select
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
