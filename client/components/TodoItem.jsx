import React, { Component, PropTypes } from 'react';
import TodoEditInput from './TodoEditInput';
import classnames from 'classnames';

class TodoItem extends Component {
  constructor() {
    super();
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleDoubleClick() {
    this.props.setEditStatus(this.props.todo.get('todoId'));
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;
    const handleSave = this.handleSave;
    let element;
    if (todo.get('todoIsEditing')) {
      element = (
        <TodoEditInput
          onSave={function onSaveHandler(text) {
            handleSave(todo.get('todoId'), text);
          }}
          initialValues={{ todoEditInput: todo.get('todoText') }}
        />
      ); //
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.get('todoCompleted')}
            onChange={function onChangeHandler() {
              completeTodo(todo.get('todoId'));
            }}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('todoText')}
          </label>
          <button className="destroy"
            onClick={function onClickHandler() {
              deleteTodo(todo.get('todoId'));
            }}
          />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.get('todoCompleted'),
        editing: todo.get('todoIsEditing')
      })}
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
  completeTodo: PropTypes.func.isRequired,
  setEditStatus: PropTypes.func.isRequired
};

export default TodoItem;
