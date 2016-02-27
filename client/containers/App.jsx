import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Immutable, { Map as iMap, List as iList } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import todoActions from '../actions/todos';
import uuid from 'node-uuid';
import { todoStoragePromise, todoStorage } from '../services';
import todoApi from '../services/api';
import humps from 'humps';

export class App extends Component {
  static fetchTodos(uri, userIp) { // this will be invoked from server. so just api not localstorage
    todoApi.setUris(uri);
    return todoStoragePromise(userIp).then(({ result, api }) => {
      // console.log(result);
      if (api) {
        return api.getTodos(result.data.userId);
      }
      return result;
    })
    .then((result) => {
      // console.log(result);
      if (result.error) {
        return result;
      }
      const newResult = Object.assign({}, result);
      const immutableList = iList();
      const todos = result.data.reduce((pre, curr) =>
        pre.push(iMap(humps.camelizeKeys(curr))), immutableList);
      newResult.todos = todos;
      return newResult;
    });
  }

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    const completeAll = this.props.appActions.completeAll;
    this.props.appActions.completeAll = () => completeAll(this.areAllMarked());
  }

  componentDidMount() { // only client
    todoStorage.getTodos().then(result => {
      if (!result.error) {
        // console.log(result);
        const immutableList = iList();
        const todos = result.data.reduce((pre, curr) =>
          pre.push(iMap(humps.camelizeKeys(curr))), immutableList);
        this.props.appActions.replaceTodos(todos);
      }
    });
  }


  addTodo(text) {
    this.props.appActions.addTodo(uuid.v1(), text);
  }

  areAllMarked() {
    return this.props.todos.every(todo => todo.get('todoCompleted'));
  }

  render() {
    const { todos, appActions, params, route } = this.props;
    let filter;
    if (route.isFromMarvel) {
      filter = 'marvel';
    } else {
      filter = typeof params.status === 'undefined' ? 'all' : params.status;
    }
    return (
      <div style={{ color: 'orange' }}>
        <Header addTodo={this.addTodo} isFromMarvel={route.isFromMarvel}>
          {this.props.children}
        </Header>
        <MainSection todos={todos} actions={appActions}
          filter={filter}
        />
      </div>
    );
  }
} //

App.propTypes = {
  todos: PropTypes.instanceOf(Immutable.List).isRequired,
  appActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  children: PropTypes.element
  // children: PropTypes.oneOfType([
  //   PropTypes.element, // React element
  //   PropTypes.array
  // ])
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
