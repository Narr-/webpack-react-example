import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import todoActions from '../actions/todos';

function App(props) {
  const { todos, appActions, filter } = props;
  return (
    <div style={{ color: 'orange' }}>
      <Header addTodo={appActions.addTodo} />
      <MainSection todos={todos} actions={appActions} filter={filter} />
    </div>
  );
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
