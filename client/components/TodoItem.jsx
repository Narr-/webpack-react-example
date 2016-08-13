import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;
    const handleSave = this.handleSave;
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.get('text')}
          editing={this.state.editing}
          onSave={function onSaveHandler(text) {
            handleSave(todo.get('id'), text);
          }}
        /> //
      );
    } else {
      element = (
        <div className="view">
          <input
            id="toggleInput"
            className="toggle"
            type="checkbox"
            checked={todo.get('completed')}
            onChange={function onChangeHandler() {
              completeTodo(todo.get('id'));
            }}
          />
          <label htmlFor="toggleInput" onDoubleClick={this.handleDoubleClick}>
            {todo.get('text')}
          </label>
          <button
            className="destroy"
            onClick={function onClickHandler() {
              deleteTodo(todo.get('id'));
            }}
          />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.get('completed'),
          editing: this.state.editing })}
      >
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
