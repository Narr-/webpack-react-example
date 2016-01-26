import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import todoActions from '../actions/todos';

class App extends Component {
  render() {
    const { todos, appActions, filter } = this.props;
    return (
      <div style={{ color: 'orange' }}>
        <Header addTodo={appActions.addTodo} />
        <MainSection todos={todos} actions={appActions} filter={filter} />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  appActions: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    filter: state.filter
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
